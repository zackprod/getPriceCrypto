const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

app.get('/getPrice', async function (req, res) {
  let { slug } = req.query;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://coinmarketcap.com/currencies/${slug}/`, {
    waitUntil: 'networkidle2',
  });
  try {
    const result = await page.$eval('.priceValue', (row) => {
      let price = row.querySelector('span').innerHTML;
      return price;
    });
    res.json({ price: parseFloat(result.replace('$', '')).toFixed(4) });
  } catch (err) {
    res.json({ price: 0 });

    console.log(null);
  }

  await browser.close();
});

app.listen(9999);
