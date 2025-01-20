export function getDomain(url) {
    const hostname = new URL(url).hostname;
    if (hostname.includes('amazon')) {
        return 'amazon';
    } else if (hostname.includes('flipkart')) {
        return 'flipkart';
    } else {
        return null; 
    }
}