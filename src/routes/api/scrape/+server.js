import { chromium } from 'playwright';
import { flipkartDataScraping, AmazonDataScraping } from '../../../utils/data';
import { getDomain } from '../../../utils/function';

export async function GET({ url }) {
    const productUrl1 = url.searchParams.get('url1');
    const productUrl2 = url.searchParams.get('url2');

    let productData1 = null;
    let productData2 = null;

    if (productUrl1) {
        const domain1 = getDomain(productUrl1);

        if (domain1 === 'flipkart') {
            productData1 = await flipkartDataScraping(productUrl1);
        } else if (domain1 === 'amazon') {
            productData1 = await AmazonDataScraping(productUrl1);
        } else {
            productData1 = 'Invalid URL or Unsupported Domain for URL 1';
        }
    } else {
        productData1 = 'URL 1 is missing or invalid';
    }

    if (productUrl1 && productUrl2) {
        const domain2 = getDomain(productUrl2);

        if (domain2 === 'flipkart') {
            productData2 = await flipkartDataScraping(productUrl2);
        } else if (domain2 === 'amazon') {
            productData2 = await AmazonDataScraping(productUrl2);
        } else {
            productData2 = 'Invalid URL or Unsupported Domain for URL 2';
        }
    } else if (productUrl1 && !productUrl2) {
        productData2 = 'URL 2 is missing or invalid';
    }

    return new Response(JSON.stringify(
        {
            productData1,
            productData2
        }
    ), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST({ request }) {
    const body = await request.json();
    const newProduct = { id: Date.now(), ...body };

    return new Response(JSON.stringify(newProduct), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}
