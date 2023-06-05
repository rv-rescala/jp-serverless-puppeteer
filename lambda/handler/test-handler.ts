import { getBrowser } from "../browser";

async function fetchData(): Promise<void> {
    const browser = await getBrowser();
    console.log("Chromium:", await browser.version());
}

export async function main() {
    await fetchData();
    return {}
}