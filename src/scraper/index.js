import puppeteer from 'puppeteer';
import Windguru from './windguru';

const extractWindData = async () => {
  const browser = await puppeteer.launch();
  //TODO : Create mapping object with spots ids
  const windguru = await Windguru.extract(browser, '110');
  //TODO : Save into DB
  await browser.close();
  return { windguru };
};

export default {
  extractWindData,
};
