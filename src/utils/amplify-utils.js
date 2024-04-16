import { cookies } from "next/headers";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
import config from "../../amplifyconfiguration.json";

export const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});
