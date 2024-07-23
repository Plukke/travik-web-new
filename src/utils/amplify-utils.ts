import { cookies } from "next/headers";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
import config from "../../amplify_outputs.json";
import { Schema } from "../../amplify/data/resource";

export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
});
