interface AppConfig {
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  DOMAIN: string;
  API_KEY: string;
  TG_BOT_TOKEN: string;
  SPUTNIK_BEARER_TOKEN: string;
  SPUTNIK_URL: string;
}

export const appConfig: AppConfig = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  DOMAIN: process.env.PUBLIC_DOMAIN as string,
  API_KEY: process.env.API_KEY as string,
  TG_BOT_TOKEN: process.env.TG_BOT_TOKEN as string,
  SPUTNIK_BEARER_TOKEN: process.env.SPUTNIK_BEARER_TOKEN as string,
  SPUTNIK_URL: process.env.SPUTNIK_URL as string,
};
