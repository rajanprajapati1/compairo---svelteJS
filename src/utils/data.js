import { chromium } from "playwright";

export async function flipkartDataScraping(productUrl) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(productUrl, { timeout: 60000 }); 

    const data = await page.evaluate(() => {
        const title = document.querySelector('.VU-ZEz')?.textContent.trim() || 'No title found';
        const price = document.querySelector('.Nx9bqj')?.textContent.trim() || 'No price found';
        const discount = document.querySelector('.yRaY8j')?.textContent.trim() || 'No discount found';
        const detailHTML = document.querySelector('._1OjC5I')?.outerHTML || '';
        const image = document.querySelector('.DByuf4');
        const imageUrl = image ? image.getAttribute('src') : 'No image found';

        const detail = [];
        const rows = document.querySelectorAll('._1OjC5I .WJdYP6');

        rows.forEach(row => {
            const key = row.querySelector('td')?.textContent.trim();
            const value = row.querySelector('td + td')?.textContent.trim();
            if (key && value) {
                detail.push({ key, value });
            }
        });

        return {
            imageUrl,
            title,
            price,
            discount,
            detail
        };
    });

    await browser.close();
    return data;
}

export async function AmazonDataScraping(productUrl) {
    const browser = await chromium.launch({ headless: true, timeout: 60000 });
    const page = await browser.newPage();

    try {
        await page.goto(productUrl, { timeout: 60000 });

        await page.waitForSelector('#productTitle', { timeout: 60000 });
        await page.waitForSelector('.a-price-whole', { timeout: 60000 });

        const data = await page.evaluate(() => {
            const title = document.getElementById('productTitle')?.textContent.trim() || 'No title found';
            const price = document.querySelector('.a-price-whole')?.textContent.trim() || 'No price found';
            const discount = document.querySelector('.a-price .a-offscreen')?.textContent.trim() || 'No discount found';
            const detailHTML = document.querySelector('.a-keyvalue')?.outerHTML || '';
            const detailHTML2 = document.querySelector('.prodDetTable')?.outerHTML || '';
            const image = document.querySelector('.a-dynamic-image a-stretch-vertical img');
            const imageUrl = image ? image.getAttribute('src') : 'No image found';
            function parseHTMLTable(html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const rows = doc.querySelectorAll('tr');
                const details = [];

                rows.forEach(row => {
                    const columns = row.querySelectorAll('th, td');
                    if (columns.length >= 2) {
                        const key = columns[0]?.textContent.trim();
                        const value = columns[1]?.textContent.trim();
                        if (key && value) {
                            details.push({ key, value });
                        }
                    }
                });
                return details;
            }

            const detail = parseHTMLTable(detailHTML); 
            const detail2 = parseHTMLTable(detailHTML2); 

            return {
                imageUrl,
                title,
                price,
                discount,
                detail,
                detail2
            };
        });

        await browser.close();
        return data;

    } catch (error) {
        console.error('Error while scraping Amazon product data:', error);
        await browser.close();
        return null; // Return null if an error occurred
    }
}

export async function scrapeAmazon(productUrl) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(productUrl, { waitUntil: 'domcontentloaded' });

    const data = await page.evaluate(() => {
        const title = document.querySelector('#productTitle')?.textContent.trim() || 'No title found';
        const price = document.querySelector('#priceblock_ourprice')?.textContent.trim() || 'No price found';
        const discount = document.querySelector('.a-price .a-offscreen')?.textContent.trim() || 'No discount found';
        return { title, price, discount };
    });

    console.log(data);
    await browser.close();
}
