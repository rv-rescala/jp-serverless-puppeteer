#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib'
import { createServerlessPuppeterStack } from './jp-serverless-puppeteer';

const app = new App();
createServerlessPuppeterStack(app);
app.synth();
