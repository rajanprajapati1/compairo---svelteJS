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
