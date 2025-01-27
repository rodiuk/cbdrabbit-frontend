interface AppConfig {
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  DOMAIN: string;
  PUBLIC_DOMAIN: string;
  API_KEY: string;
  TG_BOT_TOKEN: string;
  SENDPULSE_EVENTS_URL: string;
  SENDPULSE_API_URL: string;
  SENDPULSE_CLIENT_ID: string;
  SENDPULSE_CLIENT_SECRET: string;
  MONOBANK: string;
  NOVA_POSHTA: string;
  CURRENT_TIMEZONE: string;
}

export const appConfig: AppConfig = {
  PUBLIC_DOMAIN: process.env.PUBLIC_DOMAIN as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  DOMAIN: process.env.PUBLIC_DOMAIN as string,
  API_KEY: process.env.API_KEY as string,
  TG_BOT_TOKEN: process.env.TG_BOT_TOKEN as string,
  SENDPULSE_EVENTS_URL: process.env.SENDPULSE_EVENTS_URL as string,
  SENDPULSE_API_URL: process.env.SENDPULSE_API_URL as string,
  SENDPULSE_CLIENT_ID: process.env.SENDPULSE_CLIENT_ID as string,
  SENDPULSE_CLIENT_SECRET: process.env.SENDPULSE_CLIENT_SECRET as string,
  MONOBANK: process.env.MONOBANK as string,
  NOVA_POSHTA: process.env.NOVA_POSHTA as string,
  CURRENT_TIMEZONE: "Europe/Kiev",
};
