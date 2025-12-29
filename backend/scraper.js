import axios from "axios";
import * as cheerio from "cheerio";
import Article from "./models/Article.js";
import dotenv from "dotenv";

dotenv.config();

const BLOG_URL = "https://beyondchats.com/blogs/";


async function scrape_articles() {
  try {
    console.log("Scraping started...");

    const response = await axios.get(BLOG_URL, {
      responseType: "text",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(response.data);

    const articles = $("article").slice(-5);

    for (let i = 0; i < articles.length; i++) {
      const el = articles[i];

      const title = $(el).find("h2, h3").first().text().trim();
      const url = $(el).find("a").attr("href");

      if (!title || !url) continue;

      const articlePage = await axios.get(url, {
        responseType: "text",
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      const article$ = cheerio.load(articlePage.data);
      const content = article$("p").text().trim();

      await Article.create({ title, content, url });

      console.log("Saved:", title);
    }
  } catch (error) {
    console.error("Scraping failed:", error.message);
  }
}

export default async function runner() {
  await scrape_articles();
}
