export function getDomain(url) {
    try {
        if (!url || url.length < 7 || (!url.startsWith("http://") && !url.startsWith("https://"))) {
            return null;
        }
        if (!url || !url.startsWith("http://") && !url.startsWith("https://")) {
            return null;
        }

        const hostname = new URL(url).hostname;
        if (hostname.includes("amazon")) {
            return "amazon";
        } else if (hostname.includes("flipkart")) {
            return "flipkart";
        } else {
            return null;
        }
    } catch (error) {
        console.error("Invalid URL passed to getDomain:", url, error);
        return null;
    }
}


export function mapDomainToValue(domain) {
    if (domain === "amazon") {
        return 1;
    } else if (domain === "flipkart") {
        return 2;
    } else {
        return 0;
    }
}

export function formatProductData(product) {
    const details = product?.detail
        .map((item) => `${item?.key}: ${item?.value}`)
        .join("; ");

    return `Title: ${product?.title}, Price: ${product?.price}, Discount: ${product?.discount}, ImageUrl: ${product?.imageUrl}, Details: { ${details} }`;
}

export function parseJsonResponse(jsonString) {
    try {
        const jsonStart = jsonString.indexOf('{');
        const jsonEnd = jsonString.lastIndexOf('}') + 1;
        const jsonPart = jsonString.substring(jsonStart, jsonEnd);

        const responseObject = JSON.parse(jsonPart);
        return responseObject;
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
}
