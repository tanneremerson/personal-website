#!/usr/bin/env node

const parameters = require("./parameters.js");
const strava = require("./strava");

async function main() {
  const params = await parameters.getParameters();

  // TODO: We can get the webhookId from the params once they are set up
  const webhookId = await strava.deleteWebhook(params, webhookId);
}

(async () => {
  await main();
})();
