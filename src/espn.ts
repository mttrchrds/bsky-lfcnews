import { AtpAgent } from "@atproto/api";
import * as dotenv from "dotenv";

import { scrapeMeta } from "./utils/data";
import post from "./utils/post";

import hostData from "./hosts/espn";

import { newPostUri } from "./utils/validation";

dotenv.config();

const agent = new AtpAgent({
  service: "https://bsky.social",
});

async function main() {
  await agent.login({
    identifier: process.env.BSKY_IDENTIFIER as string,
    password: process.env.BSKY_PASSWORD as string,
  });

  const { articleUri, hashTag } = await hostData();
  const createPost = await newPostUri(agent, articleUri);

  if (createPost) {
    const { title, description, thumb } = await scrapeMeta(agent, articleUri);
    if (title && description) {
      await post(agent, hashTag, articleUri, title, description, thumb);
    }
  }
}

main();
