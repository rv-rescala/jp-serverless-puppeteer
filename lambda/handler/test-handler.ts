import { getBrowser } from "../browser";
import * as AWS from 'aws-sdk';
import * as fs from 'fs';

async function fetchData(): Promise<string> {
    const browser = await getBrowser();
    console.log("Chromium:", await browser.version());
    const path = "/tmp/screenshot.jpg";
    const page = await browser.newPage();
    await page.goto("https://www.yahoo.co.jp/");  // Await the page load
    await page.screenshot({                    // Await the screenshot
        path: path,
        fullPage: true,
    });
    //await browser.close();
    return path
}

export async function main() {
    const filePath = await fetchData();

    const s3 = new AWS.S3();
    const fileContent = fs.readFileSync(filePath);

    try {
        console.log("bucket", process.env.bucket)
        const params: AWS.S3.PutObjectRequest = {
            Bucket: process.env.bucket!,
            Key: 'screenshot.jpg',
            Body: fileContent
        };
        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
    } catch (error) {
        console.error(error);
    }
    return {}
}