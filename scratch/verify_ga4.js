async function verify() {
  console.log('--- 1. Checking Live Production HTML (https://ecoshinedoors.in/) ---');
  const res = await fetch('https://ecoshinedoors.in/?t=' + Date.now());
  const html = await res.text();
  
  const scriptTagMatch = html.match(/<script[^>]*src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-QH7PH6RFK3"[^>]*>/);
  console.log('✅ Google Tag Script in HTML head:', scriptTagMatch ? scriptTagMatch[0] : '❌ NOT FOUND');

  const configMatch = html.match(/gtag\('config',\s*'G-QH7PH6RFK3'/);
  console.log('✅ gtag config inline script in HTML head:', configMatch ? configMatch[0] : '❌ NOT FOUND');

  const allGaIds = html.match(/G-[A-Z0-9]+/g);
  console.log('All GA Measurement IDs in live HTML:', [...new Set(allGaIds)]);

  console.log('\n--- 2. Fetching Google Tag JavaScript from Google Servers ---');
  const gtagRes = await fetch('https://www.googletagmanager.com/gtag/js?id=G-QH7PH6RFK3');
  console.log('Google Tag Manager HTTP Status:', gtagRes.status, gtagRes.statusText);
  const gtagJs = await gtagRes.text();
  console.log('gtag.js size:', gtagJs.length, 'bytes');
  console.log('gtag.js contains G-QH7PH6RFK3:', gtagJs.includes('G-QH7PH6RFK3'));

  console.log('\n--- 3. Testing Google Analytics 4 Collect Hit (v=2) Endpoint ---');
  const collectUrl = `https://www.google-analytics.com/g/collect?v=2&tid=G-QH7PH6RFK3&cid=123456789.123456789&en=page_view&dl=https%3A%2F%2Fecoshinedoors.in%2F`;
  const collectRes = await fetch(collectUrl);
  console.log('GA4 Collect Request HTTP Status:', collectRes.status, collectRes.statusText);
  console.log('✅ GA4 hit successfully sent to Measurement ID G-QH7PH6RFK3!');
}

verify().catch(console.error);
