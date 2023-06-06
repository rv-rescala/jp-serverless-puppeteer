#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { ChromiumLayerStack } from '../lib/stacks/chromium-layer-stack';
import { S3Stack, S3StackProps } from '../lib/stacks/s3-stack';
import { FontLayerStack } from '../lib/stacks/font-layer-stack';
import { LambdaProps, LambdaStack, LambdaStackProps } from '../lib/stacks/lambda-stack';
import * as fs from 'fs';
import * as path from 'path';

export function createServerlessPuppeterStack(app: App) {
    const chromiumLayer = new ChromiumLayerStack(app, 'ServerlessPuppeterChromiumLayerStack', {});
    const fontLayer = new FontLayerStack(app, 'ServerlessPuppeterFontLayerStack', {});
    const s3BuketName = 'jp-serverless-puppeteer';
    const resourcesPrefix =  'jp-serverless-puppeteer';
    
    const s3Stack = new S3Stack(app, 'ServerlessPuppeterS3Stack', {
        resourcesPrefix: resourcesPrefix,
        bucketName: s3BuketName,
    });

    const lambdaProps: LambdaProps[] = [
        {
            name: "test-puppeteer-handler",
            handlerPath: path.resolve(__dirname, '..', `./lambda/handler/test-handler.ts`),
            memorySize: 1024,
            useWarmUp: 0,
            layers: [chromiumLayer.layer, fontLayer.layer],
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
            policySatements: [s3Stack.policySatement]
        },
    ];

    const lambdaStackProps: LambdaStackProps = {
        resourcesPrefix: resourcesPrefix,
        functions: lambdaProps
    };

    new LambdaStack(app, 'ServerlessPuppeterLambdaStack', lambdaStackProps);
}