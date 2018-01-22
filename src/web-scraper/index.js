import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.windguru.cz/110", {
    waitUntil: "networkidle2"
  });

  const WINDSPDID = "tabid_0_0_WINDSPD";
  const length = await page.evaluate(sel => {
    const row = document.getElementById(sel);
    return row && row.childElementCount;
  }, WINDSPDID);

  let i = 1,
    windSpd,
    prevDate,
    dayAndHour,
    windDirection,
    windGust,
    waveHeight;
  for (; i <= length; i++) {
    windSpd = await page.evaluate(sel => {
      const element = document.querySelector(sel);
      return element && element.innerHTML;
    }, `#tabid_0_0_WINDSPD > td:nth-child(${i})`);

    dayAndHour = await page.evaluate(sel => {
      const element = document.querySelector(sel);
      const content = element.innerHTML;
      return content.match(/\d{2}/g);
    }, `#tabid_0_0_dates > td:nth-child(${i})`);

    const today = new Date();
    const month = today.getUTCMonth();
    const year = today.getUTCFullYear();
    prevDate = new Date(year, month, dayAndHour[0], dayAndHour[1]);

    windGust = await page.evaluate(sel => {
      const element = document.querySelector(sel);
      return element && element.innerHTML;
    }, `#tabid_0_0_GUST > td:nth-child(${i})`);

    waveHeight = await page.evaluate(sel => {
      const element = document.querySelector(sel);
      return element && element.innerHTML;
    }, `#tabid_0_0_HTSGW > td:nth-child(${i})`);

    console.log(
      `WIND : ${windSpd}, GUST : ${windGust}, DATE: ${prevDate.toString()}, HEIGHT: ${waveHeight}`
    );
    /*
    const WINDDIRECTION = `#tabid_0_0_SMER > td:nth-child(${INDEX})`;
    */
  }

  await browser.close();
})();
