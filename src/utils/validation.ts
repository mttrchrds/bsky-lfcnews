import { AtpAgent } from "@atproto/api";
import * as dotenv from "dotenv";

dotenv.config();

type PostExternalType = {
  uri: string | undefined;
  title: string | undefined;
  description: string | undefined;
  thumb: string | undefined;
};

export const newPostUri = async (
  agent: AtpAgent,
  uri: string,
): Promise<boolean> => {
  let response = false;

  const { data: posts } = await agent.getAuthorFeed({
    actor: process.env.BSKY_IDENTIFIER as string,
    limit: 50,
  });

  const previousUris: string[] = [];

  if (posts) {
    posts.feed.forEach((p) => {
      const embed = p.post.embed;
      if (embed) {
        const embedExternal = embed.external as PostExternalType;
        if (embedExternal.uri) {
          console.log("URI", embedExternal.uri);
          previousUris.push(embedExternal.uri);
        }
      }
    });
  }

  if (!previousUris.includes(uri)) {
    return true;
  }

  return response;
};
