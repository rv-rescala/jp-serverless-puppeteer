# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

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

## Excute Local Test

```bash
npx ts-node test/test-browser.ts
```

## Deploy to AWS

```bash
cdk synth --all
cdk deploy --all
```

# Reference
- [puppeteer-aws-lambda](https://www.cloudtechsimplified.com/puppeteer-aws-lambda/)
- [@sparticuz/chromium](https://github.com/Sparticuz/chromium)