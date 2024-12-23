import * as cheerio from "cheerio";

import { fetchHTML } from "../utils/data";

const baseUri = "https://www.liverpoolecho.co.uk";
const newsPath = "/all-about/liverpool-fc";
const hashTag = "#LiverpoolEcho";

const main = async (): Promise<{ articleUri: string; hashTag: string }> => {
  let articleUri = "";
  const data: string | undefined = await fetchHTML(`${baseUri}${newsPath}`);
  const $ = cheerio.load(data);
  const title = $("body").find(".headline:first");
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
