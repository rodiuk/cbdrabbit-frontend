"use server";

import { appConfig } from "@/configs/app.config";
import { IOrderCreate, IUserOrder } from "@/interfaces/order.interface";
import { IProductCard, IProductRes } from "@/interfaces/product.interface";
import { User } from "@prisma/client";

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
          language: lang,
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

    const presentQuantity = productsForEmail?.reduce((acc, item) => {
      acc += Number(item.quantity);
      return acc;
    }, 0);

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
          presentQuantity: Math.floor(presentQuantity / 7) || 0,
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

export const senPasswordNewUserEmail = async (
  userId: string,
  userEmail: string,
  phoneNumber: string,
  firstName: string,
  lastName: string,
  password: string,
  lang?: string
) => {
  try {
    const tokenData = await getBearerToken();

    const res = await fetch(
      `${appConfig.SENDPULSE_EVENTS_URL}/id/13028c3942614eb2cbb66ee700ed7d45/8385164`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: JSON.stringify({
          email: userEmail,
          phone: phoneNumber,
          user_id: userId,
          reg_date: Date.now().toString(),
          location: "uk",
          first_name: firstName,
          last_name: lastName,
          url_activator: password,
          language: lang ?? "uk",
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
        item => item?.product?.id === product.id
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
          phone: order.user?.address?.phoneNumber,
          user_id: userId,
          event_date: Date.now().toString(),
          products: productsForEmail,
          language: lang,
          total: order.totalSum,
          order_id: orderId,
          delivery_address: `${order.user?.address?.npDeliveryType}, ${order.user?.address?.city}, ${order.user?.address?.npDepartment}`,
          delivery_price: "",
          payment_method: "online",
          presentQuantity: order?.presentQuantity || 0,
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
          language: lang,
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

export const sendWebhook = async (order: Partial<IUserOrder>) => {
  const payload = {
    id: order.id,
    checkId: order.checkId,
    status: order.status,
    presentQuantity: order.presentQuantity,

    products: order?.orderItems?.map(item => ({
      name: item?.product?.productName,
      count: item.quantity,
    })),

    totalAmount: order.totalSum,
    itemPrice: order.itemPrice,
    createdAt: order.createdAt,

    firstName: order?.user?.firstName,
    lastName: order?.user?.lastName,
    email: order?.user?.email,
    phoneNumber: order?.user?.address?.phoneNumber,

    city: order?.user?.address?.city,
    npDepartment: order?.user?.address?.npDepartment,
    npDeliveryType: order?.user?.address?.npDeliveryType,

    comment: order?.comment,

    utm_source: order?.utm_source,
    utm_medium: order?.utm_medium,
    utm_campaign: order?.utm_campaign,
    utm_content: order?.utm_content,
    utm_term: order?.utm_term,
  };
  try {
    const res = await fetch(
      "https://data.custom.systems/cbdrabbit/webhook.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return res?.status;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
