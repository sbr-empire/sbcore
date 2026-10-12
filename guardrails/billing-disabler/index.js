const { CloudBillingClient } = require('@google-cloud/billing');
const client = new CloudBillingClient();
const PROJECT_ID = process.env.GCP_PROJECT || 'sbrempire-dced5';

// Triggered by Pub/Sub budget notifications; detaches billing when cost >= budget.
exports.stopBilling = async (event) => {
  const data = JSON.parse(Buffer.from(event.data, 'base64').toString());
  if (data.costAmount <= data.budgetAmount) return;
  const name = `projects/${PROJECT_ID}`;
  const [info] = await client.getProjectBillingInfo({ name });
  if (!info.billingEnabled) return;
  await client.updateProjectBillingInfo({ name, projectBillingInfo: { billingAccountName: '' } });
  console.log(`Billing disabled for ${PROJECT_ID}`);
};
