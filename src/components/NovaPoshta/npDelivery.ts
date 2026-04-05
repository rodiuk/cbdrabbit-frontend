export interface INpDelivery {
  id: string;
  type: string;
  name: string;
  text: string;
  value: string;
}

export const npDeliveryType: Array<INpDelivery> = [
  {
    id: "1",
    type: "radio",
    name: "Спосіб доставки",
    text: "У відділення",
    value: "У відділення",
  },
  {
    id: "2",
    type: "radio",
    name: "Спосіб доставки",
    text: "У поштомат",
    value: "Поштомат",
  },
  {
    id: "3",
    type: "radio",
    name: "Спосіб доставки",
    text: "Кур'єром",
    value: "Кур'єром",
  },
];

export const normalizeNpDeliveryId = (value?: string | null): string => {
  if (!value) return "";

  const normalized = value.trim();

  if (["1", "2", "3"].includes(normalized)) {
    return normalized;
  }

  if (
    [
      "У відділення",
      "To branch",
      "branch",
      "Branch",
    ].includes(normalized)
  ) {
    return "1";
  }

  if (
    [
      "У поштомат",
      "Поштомат",
      "To parcel locker",
      "parcelLocker",
      "Parcel locker",
    ].includes(normalized)
  ) {
    return "2";
  }

  if (
    [
      "Кур'єром",
      "By courier",
      "courier",
      "Courier",
    ].includes(normalized)
  ) {
    return "3";
  }

  return normalized;
};
