import * as cheerio from "cheerio";

import { fetchHTML } from "../utils/data";

const baseUri = "https://www.espn.co.uk";
const newsPath = "/football/team/_/id/364/liverpool";
const hashTag = "#ESPN";

const main = async (): Promise<{ articleUri: string; hashTag: string }> => {
  let articleUri = "";
  const data: string | undefined = await fetchHTML(`${baseUri}${newsPath}`);
  const $ = cheerio.load(data);
  const anchor = $("body").find("a.contentItem__content:first");
  if (anchor) {
    const href = anchor.attr("href");

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
