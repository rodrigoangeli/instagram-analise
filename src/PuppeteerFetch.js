const fs = require('fs');
const puppeteer = require('puppeteer');


(async () => {
  // Set up browser and page.
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args:[
      '--window-size=1366,768',
      '--window-position=680,0',
      '--disable-infobars']
  });
  const page = await browser.newPage(); 

  // Navigate to the demo page.
  await page.goto('https://www.nytimes.com/');
  await page.screenshot({ path: 'nytimes.png', fullPage: true })
  await browser.close()

  //let jsonRecebidoRaw = fs.readFileSync('jsonRecebido.json');
  //let jsonRecebido = JSON.parse(jsonRecebidoRaw);
  //const post = await scrapeInfiniteScrollItems(page, jsonRecebido.Dados.dataDe, jsonRecebido.Dados.dataAte);
  //let data = JSON.stringify(post, null, 2);

  
  // Save extracted items to a file.
  //fs.writeFileSync('myjsonfile.json', data, 'utf8');

  // Close the browser.
  //await browser.close();
  
})();