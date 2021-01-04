#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { StravaWebhook } from "../lib/strava-webhook-stack";

const app = new cdk.App();
new StravaWebhook(app, "StravaWebhook");
