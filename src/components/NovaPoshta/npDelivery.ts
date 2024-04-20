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
