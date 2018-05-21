import { dates } from '../services';

const WINDGURU_URL = 'https://www.windguru.cz';
const WINDSPDID = 'tabid_0_0_WINDSPD';
const DAYANDHOURID = 'tabid_0_0_dates';
const GUSTID = 'tabid_0_0_GUST';
const WAVESID = 'tabid_0_0_HTSGW';

export default class Windguru {
  static extract = async (browser, spotId) => {
    const page = await browser.newPage();
    await page.goto(`${WINDGURU_URL}/${spotId}`, {
      waitUntil: 'networkidle2',
    });

    const length = await page.evaluate(sel => {
      const row = document.getElementById(sel);
      return row && row.childElementCount;
    }, WINDSPDID);

    let i = 1,
      windSpd,
      dateAndHour,
      windGust,
      waveHeight;

    let result = [];

    for (; i <= length; i++) {
      windSpd = await page.evaluate(sel => {
        const element = document.querySelector(sel);
        return element && element.innerHTML;
      }, `#${WINDSPDID} > td:nth-child(${i})`);

      dateAndHour = await page.evaluate(sel => {
        const element = document.querySelector(sel);
        const content = element.innerHTML;
        return content.match(/\d{2}/g);
      }, `#${DAYANDHOURID} > td:nth-child(${i})`);

      windGust = await page.evaluate(sel => {
        const element = document.querySelector(sel);
        return element && element.innerHTML;
      }, `#${GUSTID} > td:nth-child(${i})`);

      waveHeight = await page.evaluate(sel => {
        const element = document.querySelector(sel);
        return element && element.innerHTML;
      }, `#${WAVESID} > td:nth-child(${i})`);

      result.push({
        WIND: windSpd,
        DATE: dates.extractFromDateAndHour(...dateAndHour),
        GUST: windGust,
        WAVE: waveHeight,
      });
    }

    return result;
  };
}
