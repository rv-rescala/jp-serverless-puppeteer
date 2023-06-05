#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { ChromiumLayerStack } from '../lib/stacks/chromium-layer-stack';
import { LambdaProps, LambdaStack, LambdaStackProps } from '../lib/stacks/lambda-stack';
import * as fs from 'fs';
import * as path from 'path';

export function createServerlessPuppeterStack(app: App) {
    const layer = new ChromiumLayerStack(app, 'ServerlessPuppeterChromiumLayerStack', {});

    const lambdaProps: LambdaProps[] = [
        {
            name: "test-puppeteer-handler",
            handlerPath: path.resolve(__dirname, '..', `./lambda/handler/test-handler.ts`),
            memorySize: 512,
            useWarmUp: 0,
            layers: [layer.layer],
            environment: {
                NODE_ENV: 'production',
            },
            bundling: {
                minify: false,
                sourceMap: true,
                forceDockerBundling: false,
                externalModules: ['aws-sdk',  '@sparticuz/chromium'],
                nodeModules: ['puppeteer-core']
            },
        },
    ];

    const lambdaStackProps: LambdaStackProps = {
        resourcesPrefix: 'jp-serverless-puppeteer',
        functions: lambdaProps,
    };

    new LambdaStack(app, 'ServerlessPuppeterLambdaStack', lambdaStackProps);
}