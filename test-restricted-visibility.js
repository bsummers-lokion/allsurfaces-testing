import puppeteer from 'puppeteer';

async function waitForPrices(page, timeout = 60000) {
    console.log('Waiting for prices to load...');
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const loadingCount = await page.$$eval('.loading, [class*="loading"]', els => els.length);
        if (loadingCount === 0) {
            console.log('Prices loaded');
            return true;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    console.log('Timeout waiting for prices');
    return false;
}

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    // Go to the login page
    await page.goto('https://allsurfaces.development.computer/', {
        waitUntil: 'networkidle2',
        timeout: 30000
    });

    // Log in as the customer user
    await page.type('#userNameSignIn', 'anita.newduck@dowhat.now');
    await page.type('#passwordSignIn', 'Password1');
    await page.evaluate(() => {
        document.getElementById('form-login').submit();
    });
    
    try {
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });
    } catch (e) {
        console.log('Navigation timeout, current URL:', page.url());
    }

    // Search for a product that doesn't have restricted visibility
    console.log('Searching for a product that does not have restricted visibility...');
    await page.goto('https://allsurfaces.development.computer/products?search=QEP82509BR', {
        waitUntil: 'networkidle2',
        timeout: 30000
    });
    await waitForPrices(page);
    
    // Get the first product link
    const productLink = await page.$eval('.product-item a', el => el.href);
    console.log('Product URL:', productLink);
    
    // Take screenshot showing the product is visible
    await page.screenshot({ path: 'screenshot-product-visible.png', fullPage: true });
    
    // Get the product SKU
    const productSku = await page.$eval('.product-item .sku', el => el.textContent);
    console.log('Product SKU:', productSku);

    // Now set the product to have restricted visibility
    console.log('Setting the product to have restricted visibility...');
    await page.evaluate(async () => {
        const res = await fetch('/api/rest/latest/products/20108', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ restricted_visibility: true })
        });
        return res.ok;
    });
    
    // Reload the page
    await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
    await waitForPrices(page);
    
    // Take screenshot showing the product is now hidden
    await page.screenshot({ path: 'screenshot-product-hidden.png', fullPage: true });
    
    // Count products
    const productCount = await page.$$eval('.product-item', els => els.length);
    console.log('Products visible after setting restricted visibility:', productCount);

    await browser.close();
})();
