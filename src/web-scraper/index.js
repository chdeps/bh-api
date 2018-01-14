import puppeteer from "puppeteer";
import db from "../db";

export const scrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.windguru.cz/110");
  await browser.close();
};
