#!/usr/bin/env node
const cdk = require("@aws-cdk/core");
const { StravaWebhookStack } = require("../lib/strava-webhook-stack");

const app = new cdk.App();
new StravaWebhookStack(app, "StravaWebhookStack");
