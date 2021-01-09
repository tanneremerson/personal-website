#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { StravaWebhookStack } from "../lib/strava-webhook-stack";

const app = new cdk.App();
new StravaWebhookStack(app, "StravaWebhookStack");
