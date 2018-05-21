import puppeteer from 'puppeteer';
import Windguru from './windguru';

export default async () => {
  const browser = await puppeteer.launch();
  //TODO : Create mapping object with spots ids
  const data = await Windguru.extract(browser, '110');
  await browser.close();
  return data;
};
