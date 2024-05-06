"use server";

import { appConfig } from "@/configs/app.config";

export const passwordResetSendEmail = async (email: string, code: string) => {
  try {
    const res = await fetch(appConfig.SPUTNIK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: appConfig.SPUTNIK_BEARER_TOKEN,
      },
      body: JSON.stringify({
        eventTypeKey: "password_restore",
        keyValue: email,
        params: [
          {
            name: "emailAddress",
            value: email,
          },
          {
            name: "url_password_restore",
            value: `https://cbdrabbit.shop/uk/signIn?resetPassword=${code}`,
          },
        ],
      }),
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const signUpActivateSendEmail = async (
  email: string,
  phoneNumber: string,
  code: string
) => {
  try {
    const res = await fetch(appConfig.SPUTNIK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: appConfig.SPUTNIK_BEARER_TOKEN,
      },
      body: JSON.stringify({
        eventTypeKey: "registration",
        keyValue: email,
        params: [
          {
            name: "emailAddress",
            value: email,
          },
          {
            name: "phone",
            value: phoneNumber ?? "",
          },
          {
            name: "url_activator",
            value: `https://cbdrabbit.shop/uk/signUp?code=${code}`,
          },
        ],
      }),
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const emailUpdateSendEmail = async (email: string, code: string) => {
  try {
    const res = await fetch(appConfig.SPUTNIK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: appConfig.SPUTNIK_BEARER_TOKEN,
      },
      body: JSON.stringify({
        eventTypeKey: "password_restore",
        keyValue: email,
        params: [
          {
            name: "emailAddress",
            value: email,
          },
          {
            name: "url_password_restore",
            value: `https://cbdrabbit.shop/uk/signIn?changeEmail=true&code=${code}&newEmail=${email}`,
          },
        ],
      }),
    });

    return res;
  } catch (error) {
    throw error;
  }
};
