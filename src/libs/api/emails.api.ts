"use server";

import { appConfig } from "@/configs/app.config";

const getBearerToken = async () => {
  try {
    const tokenData = await fetch(
      `${appConfig.SENDPULSE_API_URL}/oauth/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "client_credentials",
          client_id: appConfig.SENDPULSE_CLIENT_ID,
          client_secret: appConfig.SENDPULSE_CLIENT_SECRET,
        }),
      }
    );

    return tokenData.json();
  } catch (error) {
    throw error;
  }
};

export const passwordResetSendEmail = async (email: string, code: string) => {
  try {
    const res = await fetch("v2/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
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
  userId: string,
  code: string,
  firstName?: string | null,
  lastName?: string | null
) => {
  try {
    const tokenData = await getBearerToken();

    if (!tokenData?.access_token) return null;

    const res = await fetch(
      `${appConfig.SENDPULSE_EVENTS_URL}/name/registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: JSON.stringify({
          email: email,
          phone: phoneNumber ?? "",
          user_id: userId,
          first_name: firstName ?? "",
          last_name: lastName ?? "",
          reg_date: Date.now().toString(),
          location: "uk",
          url_activator: `https://cbdrabbit.shop/uk/signUp?code=${code}`,
        }),
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
};

export const updateContactInSendPulse = async (
  email: string,
  firstName?: string | null,
  lastName?: string | null,
  phoneNumber?: string
) => {
  try {
    const tokenData = await getBearerToken();
    const fullName = `${firstName ?? ""} ${lastName ?? ""}`;

    if (!tokenData?.access_token) return null;

    const res = await fetch(
      `${appConfig.SENDPULSE_API_URL}/addressbooks/706336/emails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: JSON.stringify({
          emails: [
            {
              email: email,
              variables: {
                name: fullName,
                phone: phoneNumber ?? "",
              },
            },
          ],
        }),
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
};

export const emailUpdateSendEmail = async (email: string, code: string) => {
  try {
    const res = await fetch("v2/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
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
