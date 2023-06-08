#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { ChromiumLayerStack } from '../lib/modules/chromium-layer-stack';
import { ServerlessPuppeteerStack, ServerlessPuppeteerStackProps, LambdaProps } from '../lib/serverless-puppeteer-stack'; 
import * as fs from 'fs';
import * as path from 'path';

export function createServerlessPuppeterStack(app: App) {

    const s3BuketName = 'jp-serverless-puppeteer';
    const resourcesPrefix =  'jp-serverless-puppeteer';

    const lambdaProps: LambdaProps[] = [
        {
            name: "test-puppeteer-handler",
            handlerPath: path.resolve(__dirname, '..', `./lambda/handler/test-handler.ts`),
            memorySize: 1024,
            useWarmUp: 0,
            environment: {
                NODE_ENV: 'production',
                bucket: s3BuketName
            },
            bundling: {
                minify: false,
                sourceMap: true,
                forceDockerBundling: false,
                externalModules: ['@sparticuz/chromium'],
                nodeModules: ['puppeteer-core']
            },
        },
    ];

    const serverlessPuppeteerStackProps: ServerlessPuppeteerStackProps = {
        resourcesPrefix: resourcesPrefix,
        bucketName: s3BuketName,
        functions: lambdaProps
    };

    new ServerlessPuppeteerStack(app, 'ServerlessPuppeterLambdaStack', serverlessPuppeteerStackProps);
}