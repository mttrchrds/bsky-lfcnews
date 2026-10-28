import { fetchHTML } from "../utils/data";
import * as cheerio from "cheerio";

const baseUri = "https://www.liverpoolfc.com";
const newsPath = "/news";
const hashTag = "#LiverpoolFootballClub";

const main = async (): Promise<{ articleUri: string; hashTag: string }> => {
  let articleUri = "";
  const data: string | undefined = await fetchHTML(`${baseUri}${newsPath}`);
  const $ = cheerio.load(data);
  const title = $("body").find(`[data-testid="article-card__link"]:first`);
  if (title) {
    const href = title.attr("href");
    if (href) {
      if (href.includes("://")) {
        articleUri = href;
      } else {
        articleUri = `${baseUri}${href}`;
      }
    }
  }
  return { articleUri, hashTag };
};

export default main;
