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

1. Install

```bash
git clone https://github.com/rv-rescala/jp-serverless-puppeteer
npx @puppeteer/browsers install chromium@latest --path /tmp/localChromium
npm install @sparticuz/chromium@109 puppeteer-core@19.4
npm run init
```

! If you faced "Export assignment cannot be used when targeting ECMAScript modules. Consider using 'export default' or another module format instead. 75 export = LambdaFS;", Please edit chronium/tsconfig.json and add 

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true
  }
}
```

After that, please execute
```bash
cd chromium && make chromium.zip
```

2. Set env

```bash
export IS_LOCAL=true    
export BROWSER_PATH=/tmp/localChromium/chromium/mac_arm-1153064/chrome-mac/Chromium.app/Contents/MacOS/Chromium # chack your path
```

3. Excute test
```bash
npx ts-node test/test-browser.ts
```

# Reference
- [puppeteer-aws-lambda](https://www.cloudtechsimplified.com/puppeteer-aws-lambda/)
- [@sparticuz/chromium](https://github.com/Sparticuz/chromium)