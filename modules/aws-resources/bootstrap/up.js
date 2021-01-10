#!/usr/bin/env node

const parameters = require("./parameters.js");
const strava = require("./strava");

async function main() {
  const params = await parameters.getParameters();

  const webhookId = await strava.createWebhook(params);

  // TODO: We need to put the webhook ID into SSM so that we can delete it in the down script
}

(async () => {
  await main();
})();
