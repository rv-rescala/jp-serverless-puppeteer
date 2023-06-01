#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib'
import { ChromiumLayerStack } from '../lib/stacks/chromium-layer-stack';

export function createServerlessPuppeterStack(app: App) {
    const layer = new ChromiumLayerStack(app, 'ChromiumLayerStack', {});
    return layer;
}