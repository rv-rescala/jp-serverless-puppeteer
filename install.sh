#!/bin/bash
git clone --depth=1 https://github.com/rv-rescala/jp-chromium chromium&& \
cd chromium && \
make chromium.zip

cp -r jp-serverless-puppeteer/serverless-puppeter-lambda/ serverless-puppeter-lambda
cp -r jp-serverless-puppeteer/test/ test

npx @puppeteer/browsers install chromium@latest --path /tmp/localChromium
npm install @sparticuz/chromium@109 puppeteer-core@19.4