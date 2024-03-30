interface AppConfig {
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  DOMAIN: string;
}

export const appConfig: AppConfig = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  DOMAIN: process.env.PUBLIC_DOMAIN as string,
};
