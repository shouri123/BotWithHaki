import { authenticate } from "@google-cloud/local-auth";
import fs from "fs";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import {
  resolveGoogleCredentialsPath,
  resolveGoogleTokenPath,
  saveGeneratedGoogleCredentials,
} from "./googleOAuthPaths.js";

const promptForCredentials = async (): Promise<string> => {
  if (!process.stdin.isTTY) {
    throw new Error(
      "Google OAuth credentials not found. Run in an interactive terminal or set GOOGLE_OAUTH_CREDENTIALS_PATH / GOOGLE_OAUTH_CREDENTIALS_JSON."
    );
  }

  console.log("Google OAuth credentials not found.");
  console.log("Paste your OAuth Desktop App credentials once to continue.");

  const rl = readline.createInterface({ input, output });
  try {
    const clientId = (await rl.question("Google OAuth Client ID: ")).trim();
    const clientSecret = (await rl.question("Google OAuth Client Secret: ")).trim();
    const redirectUriInput = (await rl.question("Redirect URI (press Enter for http://localhost): ")).trim();

    if (!clientId || !clientSecret) {
      throw new Error("Client ID and Client Secret are required to generate credentials.");
    }

    return saveGeneratedGoogleCredentials(
      clientId,
      clientSecret,
      redirectUriInput || "http://localhost"
    );
  } finally {
    rl.close();
  }
};

export async function generateGoogleToken(): Promise<void> {
  let credPath: string;
  try {
    credPath = resolveGoogleCredentialsPath();
  } catch {
    credPath = await promptForCredentials();
  }
  const tokenPath = resolveGoogleTokenPath();

  const auth = await authenticate({
    keyfilePath: credPath,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  fs.writeFileSync(tokenPath, JSON.stringify(auth.credentials, null, 2), "utf-8");
  console.log(`Google login successful. Token saved at: ${tokenPath}`);
}

const isMain =
  typeof process !== "undefined" &&
  process.argv[1] &&
  process.argv[1].replace(/\\/g, "/").endsWith("config/localAuth.js");

if (isMain) {
  generateGoogleToken().catch(console.error);
}
