import { getBrowser } from "../lambda/browser";

async function fetchData(): Promise<void> {
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.goto("https://www.yahoo.co.jp/");  // Await the page load
    await page.screenshot({                    // Await the screenshot
        path: "/tmp/screenshot.jpg",
        fullPage: true,
    });
    await browser.close();
}

fetchData();