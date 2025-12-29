import axios from "axios";
import * as cheerio from "cheerio";
import Article from "./models/Article.js";
import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";

dotenv.config();

const BLOG_URL = "https://beyondchats.com/blogs/";

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b" 
});

const BLOCKED_DOMAINS = [
  "sciencedirect.com",
  "elsevier.com",
  "researchgate.net",
  "springer.com",
  "academia.edu",
  "jstor.org",
];

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

      const existingArticle = await Article.findOne({ url: url });
      
      if (existingArticle) {
        console.log(`Skipping duplicate: "${title}"`);
        continue; 
      }
      try {
        const articlePage = await axios.get(url, {
          responseType: "text",
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        });
  
        const article$ = cheerio.load(articlePage.data);
        const content = article$("p").text().trim();
  
        await Article.create({ title, content, url });
  
        console.log("Saved new article:", title);
      } catch (innerError) {
        console.error(`Failed to fetch content for ${url}:`, innerError.message);
      }
    }
  } catch (error) {
    console.error("Scraping failed:", error.message);
  }
}

async function enhance_articles() {
  const articles = await Article.find({
    updated_content: { $exists: false },
  });

  for (let article of articles) {
    console.log("Enhancing:", article.title);

    let links = [];

    try {
      const searchRes = await axios.get("https://serpapi.com/search", {
        params: {
          q: article.title,
          engine: "google",
          api_key: process.env.SERPAPI_API_KEY,
        },
      });

      links = (searchRes.data.organic_results || [])
        .map((r) => r.link)
        .filter((link) => {
          try {
            const host = new URL(link).hostname;
            return !BLOCKED_DOMAINS.some((d) => host.includes(d));
          } catch {
            return false;
          }
        })
        .slice(0, 2);
    } catch (err) {
      console.error("Search API failed:", err.message);
      continue;
    }

    if (links.length === 0) {
      console.log("No references found, skipping");
      continue;
    }

    let ref_text = "";

    for (let link of links) {
      try {
        const page = await axios.get(link, {
          responseType: "text",
          timeout: 8000,
          headers: { "User-Agent": "Mozilla/5.0" },
        });

        const $ = cheerio.load(page.data);
        ref_text += $("p").text().slice(0, 3000);
      } catch (err) {
        console.log("Skipped blocked site:", link);
      }
    }

    const prompt = `
Rewrite the article below by improving structure, clarity, and SEO.
Match the tone and formatting of the reference articles.

ORIGINAL ARTICLE:
${article.content}

REFERENCE CONTENT:
${ref_text}

At the end, add a "References" section.
`;

    try {
      const response = await llm.invoke(prompt);
      article.updated_content = response.content;
      article.references = links;
      await article.save();
  
      console.log("Updated:", article.title);
    } catch (llmError) {
      console.error("LLM Error:", llmError.message);
    }
  }
}

export default async function runner() {
  await scrape_articles();
  await enhance_articles();
}