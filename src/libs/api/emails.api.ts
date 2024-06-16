"use server";

import { appConfig } from "@/configs/app.config";
import { IOrderCreate, IUserOrder } from "@/interfaces/order.interface";
import { IProductCard, IProductRes } from "@/interfaces/product.interface";
import { Order, User } from "@prisma/client";

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

export const passwordResetSendEmail = async (
  email: string,
  user: User,
  code: string,
  lang?: string
) => {
  try {
    const tokenData = await getBearerToken();

    if (!tokenData?.access_token) return null;

    const res = await fetch(
      `${appConfig.SENDPULSE_EVENTS_URL}/name/password_renew `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: JSON.stringify({
          email: email,
          user_id: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
          lang: lang,
          url_password: `https://cbdrabbit.shop/uk/signIn?resetPassword=${code}`,
        }),
      }
    );

    const pulseRes = await res.json();
    console.log({ pulseRes });
    return pulseRes;
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
  isPromo: boolean,
  firstName?: string | null,
  lastName?: string | null,
  isVerified?: boolean | null,
  phoneNumber?: string | null
) => {
  try {
    const tokenData = await getBearerToken();
    const fullName = `${firstName ?? ""} ${lastName ?? ""}`;

    if (!tokenData?.access_token) return null;

    const sendUpdate = async () => {
      return fetch(
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
                  isVerified: isVerified ?? false,
                  isPromo,
                },
              },
            ],
          }),
        }
      );
    };

    const res = await sendUpdate();
    const pulseRes = await res.json();

    if ("result" in pulseRes && pulseRes.result) return;

    //Attention: Sendpulse API has bug with request on update contacts sometimes
    setTimeout(() => {
      sendUpdate();
    }, 60000);
  } catch (error) {
    throw error;
  }
};

export const createOrderEmail = async (
  userId: string,
  order: IOrderCreate,
  products: IProductCard[],
  firstOrder: boolean,
  orderId?: string,
  lang?: string
) => {
  try {
    const tokenData = await getBearerToken();

    const productsForEmail = products
      .filter(product => product.count > 0)
      .map(product => ({
        name: product.productName,
        url: "not product url",
        imageUrl: product?.images && product?.images[0]?.url,
        description: product.description,
        cost: order.itemPrice,
        quantity: order.items.filter(item => item.productId === product.id)[0]
          ?.quantity,
      }));

    const res = await fetch(
      `${appConfig.SENDPULSE_EVENTS_URL}/name/ordercreate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: JSON.stringify({
          email: order.email,
          phone: order.address.phoneNumber,
          user_id: userId,
          event_date: Date.now().toString(),
          products: productsForEmail,
          language: lang,
          total: order.totalSum,
          order_id: orderId,
          delivery_address: `${order.address.npDeliveryType}, ${order.address.city}, ${order.address.npDepartment}`,
          delivery_price: "",
          payment_method: "online",
          first_order: firstOrder ? "yes" : "no",
          utm_source: order?.utm_source,
          utm_medium: order?.utm_medium,
          utm_campaign: order?.utm_campaign,
          utm_content: order?.utm_content,
          utm_term: order?.utm_term,
        }),
      }
    );

    const pulseRes = await res.json();
    console.log({ pulseRes });
    return true;
  } catch (error) {
    throw error;
  }
};

export const orderInProgressEmail = async (
  userId: string,
  order: IUserOrder,
  products: IProductRes[],
  firstOrder: boolean,
  orderId?: string,
  lang?: string
) => {
  try {
    const tokenData = await getBearerToken();

    const productsForEmail = products.map(product => ({
      name: product.productName,
      url: "not product url",
      imageUrl: product?.images && product?.images[0]?.url,
      description: product.description,
      cost: order.itemPrice,
      quantity: order.orderItems.filter(
        item => item.product.id === product.id
      )[0]?.quantity,
    }));

    const res = await fetch(
      `${appConfig.SENDPULSE_EVENTS_URL}/name/orderin_progress`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: JSON.stringify({
          email: order.user.email,
          phone: order.user.address.phoneNumber,
          user_id: userId,
          event_date: Date.now().toString(),
          products: productsForEmail,
          language: lang,
          total: order.totalSum,
          order_id: orderId,
          delivery_address: `${order.user.address.npDeliveryType}, ${order.user.address.city}, ${order.user.address.npDepartment}`,
          delivery_price: "",
          payment_method: "online",
          first_order: firstOrder ? "yes" : "no",
          utm_source: order?.utm_source,
          utm_medium: order?.utm_medium,
          utm_campaign: order?.utm_campaign,
          utm_content: order?.utm_content,
          utm_term: order?.utm_term,
        }),
      }
    );

    const pulseRes = await res.json();
    console.log({ pulseRes });
    return true;
  } catch (error) {
    throw error;
  }
};

export const emailUpdateSendEmail = async (
  email: string,
  user: User,
  code: string,
  lang: string
) => {
  try {
    const tokenData = await getBearerToken();

    if (!tokenData?.access_token) return null;

    const res = await fetch(
      `${appConfig.SENDPULSE_EVENTS_URL}/name/change_email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: JSON.stringify({
          email: email,
          user_id: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
          lang: lang,
          url_change_email: `https://cbdrabbit.shop/uk/signIn?resetPassword=${code}`,
        }),
      }
    );

    const pulseRes = await res.json();
    console.log({ pulseRes });
    return pulseRes;
  } catch (error) {
    throw error;
  }
};

export const sendWebhook = async (order: Order) => {
  try {
    return fetch("https://data.custom.systems/cbdrabbit/webhook.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  } catch (error) {
    throw error;
  }
};
