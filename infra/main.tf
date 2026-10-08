terraform {
  required_providers {
    google = { source = "hashicorp/google", version = ">= 5.0" }
  }
}

provider "google" {
  project               = var.project_id
  region                = var.region
  billing_project       = var.project_id
  user_project_override = true
}

resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com", "secretmanager.googleapis.com",
    "billingbudgets.googleapis.com", "cloudbilling.googleapis.com",
  ])
  service            = each.key
  disable_on_destroy = false
}

# 1. Budget alerts: ₹500 and ₹1000, emailing billing admins (default IAM recipients)
resource "google_billing_budget" "budget" {
  billing_account = var.billing_account
  display_name    = "${var.project_id}-budget"

  budget_filter {
    projects = ["projects/${var.project_number}"]
  }

  amount {
    specified_amount {
      currency_code = "INR"
      units         = "1000"
    }
  }

  threshold_rules { threshold_percent = 0.5 } # ₹500
  threshold_rules { threshold_percent = 1.0 } # ₹1000

  all_updates_rule {
    # Emails Billing Account Administrators and Users
    disable_default_iam_recipients = false
  }

  depends_on = [google_project_service.apis]
}

# 3. Secret Manager
resource "google_secret_manager_secret" "secrets" {
  for_each  = toset(var.secret_names)
  secret_id = each.key
  replication {
    auto {}
  }
  depends_on = [google_project_service.apis]
}
# Values are NOT stored in Terraform/git. Add them with:
#   printf '%s' "$VALUE" | gcloud secrets versions add NAME --data-file=-

resource "google_service_account" "run" {
  account_id   = "${var.service_name}-run"
  display_name = "Cloud Run runtime for ${var.service_name}"
}

resource "google_secret_manager_secret_iam_member" "access" {
  for_each  = google_secret_manager_secret.secrets
  secret_id = each.value.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.run.email}"
}

# 2. Cloud Run: scale to zero, max 2 instances
resource "google_cloud_run_v2_service" "svc" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = google_service_account.run.email
    scaling {
      min_instance_count = 0
      max_instance_count = 2
    }
    containers {
      image = var.image
      dynamic "env" {
        for_each = toset(var.secret_names)
        content {
          name = env.value
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.secrets[env.value].secret_id
              version = "latest"
            }
          }
        }
      }
    }
  }

  depends_on = [google_secret_manager_secret_iam_member.access]
}
