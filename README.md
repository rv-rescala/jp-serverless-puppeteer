# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

# Local
1. install dependencies
```bash
npx @puppeteer/browsers install chromium@latest --path /tmp/localChromium
```

2. Set env
```bash
export IS_LOCAL=true    
export BROWSER_PATH=/tmp/localChromium/chromium/mac_arm-1151547/chrome-mac/Chromium.app/Contents/MacOS/Chromium 
```

3. Excute test
```bash
npx ts-node test/test-browser.ts
```

# Reference
- [puppeteer-aws-lambda](https://www.cloudtechsimplified.com/puppeteer-aws-lambda/)
- [](https://github.com/Sparticuz/chromium)