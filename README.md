# Serverless Puppeteer on AWS Lambda

This is a project for running Puppeteer on AWS Lambda and its Japanese Language Pack support.
It is deployed using AWS CDK and the Lambda function is written in TypeScript.

- [Japanese](https://qiita.com/roundv/items/04220351f8e9d1523020)

# Installation

## Install dependencies

```bash
git clone https://github.com/rv-rescala/jp-serverless-puppeteer
npx @puppeteer/browsers install chromium@latest --path /tmp/localChromium
npm install @sparticuz/chromium@109 puppeteer-core@19.4
make init
```

## Set env

```bash
export IS_LOCAL=true    
export BROWSER_PATH=/tmp/localChromium/chromium/mac_arm-1153064/chrome-mac/Chromium.app/Contents/MacOS/Chromium # chack your path
```

## Execute Local Test

```bash
npx ts-node test/test-browser.ts
```

## Deploy to AWS

```bash
cdk synth --all
cdk deploy --all
```

## Run Lambda

Please run "jp-serverless-puppeteer-test-puppeteer-handler" on Lambda console.

# Reference
- [puppeteer-aws-lambda](https://www.cloudtechsimplified.com/puppeteer-aws-lambda/)
- [@sparticuz/chromium](https://github.com/Sparticuz/chromium)