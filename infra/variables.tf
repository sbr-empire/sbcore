variable "project_id" { type = string }
variable "project_number" {
  type        = string
  description = "Numeric project number (used to scope the budget)"
}
variable "billing_account" {
  type        = string
  description = "Billing account ID, e.g. 012345-6789AB-CDEF01 (must be billed in INR for ₹ budgets)"
}
variable "region" {
  type    = string
  default = "us-central1"
}
variable "image" {
  type        = string
  description = "Container image for the Cloud Run service"
}
variable "service_name" {
  type    = string
  default = "sbcore"
}

# Names of secrets (= env var names). Adjust to your 14 keys.
variable "secret_names" {
  type = list(string)
  default = [
    "NASA_API_KEY", "AIRNOW_API_KEY", "OPENWEATHER_API_KEY", "WEATHER_API_KEY",
    "OPENAI_API_KEY", "ANTHROPIC_API_KEY", "GEMINI_API_KEY", "JWT_SECRET",
    "FIREBASE_API_KEY", "GCP_PRIVATE_KEY", "GCP_PRIVATE_KEY_ID", "GCP_CLIENT_EMAIL",
    "GCP_CLIENT_ID", "GCP_STORAGE_BUCKET",
  ]
}
