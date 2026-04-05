import Image from "next/image";
import { OrderStatus } from "@prisma/client";
import OrderProduct from "./OrderProduct/OrderProduct";
import { IOrderDict } from "@/interfaces/i18n.interface";
import { IUserOrder } from "@/interfaces/order.interface";
import { formatDisplayedCheckId } from "@/utils/formatDisplayedCheckId";
import { format, toZonedTime } from "date-fns-tz";

import s from "./OrderItem.module.css";

import sale_icon from "/public/img/sale_icon.svg";
import { InfoIcon } from "@/components/icons/InfoIcon";
import { appConfig } from "@/configs/app.config";

interface Prop {
  menu?: boolean;
  order: IUserOrder;
  currency: string;
  dict: IOrderDict;
  openPoup: () => void;
}

const OrderItemCard = ({ menu, order, dict, currency, openPoup }: Prop) => {
  const orderStatus = () => {
    switch (order.status) {
      case OrderStatus.CREATED:
        return dict.statusCreated;
      case OrderStatus.PAID:
        return dict.statusPaid;
      case OrderStatus.COMPLETED:
        return dict.statusCompleted;
      case OrderStatus.SENDED:
        return dict.statusSended;
      case OrderStatus.CANCELED:
        return dict.statusCanceled;
      case OrderStatus.DELIVERED:
        return dict.statusDelivered;
      case OrderStatus.SUCCESS:
        return dict.statusSuccess;
      default:
        return dict.statusCreated;
    }
  };

  const totalQuantity = order?.orderItems?.reduce(
    (acc, item) => acc + (item?.quantity || 0),
    0
  );
  const sale = totalQuantity * 90 - order?.totalSum;

  return (
    <>
      <div className={s.orderInfo}>
        <div className={s.top_info}>
          <div className={s.orderInfo_num}>
            <p>№ {formatDisplayedCheckId(order.checkId)}</p>
          </div>
          <div className={s.butt_info} onClick={openPoup}>
            <InfoIcon iconStyle={s.icon_info} />{" "}
          </div>
        </div>
        <div className={s.orderInfo_descr}>
          {format(
            toZonedTime(order.createdAt, appConfig.CURRENT_TIMEZONE),
            "dd.MM.yyyy HH:mm"
          )}
        </div>
        <div className={s.orderInfo_ttl}>{orderStatus()}</div>
        {/* <div className={s.orderInfo_ttl}>
          Відправлено <span className={s.ttl_end}>18.03.24, 11:52</span>
        </div>
        <div className={s.orderInfo_ttl}>
          <span className={s.red}>Зберігається до 21.03.24, 11:52</span>{" "}
        </div>
        <div className={s.orderInfo_ttl}>
          <span className={s.red}>Не отримано</span>{" "}
          <span className={s.ttl_end}>18.03.24, 11:52</span>
        </div>
        <div className={s.orderInfo_ttl}>
          <span className={s.red}>Кошти повернуто</span>{" "}
          <span className={s.ttl_end}>18.03.24, 11:52</span>
        </div> */}
        {order?.deliveryInfo?.trackingNumber && (
          <div className={s.ttl_black}>
            {dict.trackingNumber} {order?.deliveryInfo?.trackingNumber}
          </div>
        )}

        <div className={s.orderInfo_items}>
          {order?.orderItems?.map(item => {
            return (
              <OrderProduct
                key={item.id}
                item={item}
                itemPrice={order.itemPrice}
              />
            );
          })}
        </div>

        <div className={s.orderInfo_pay}>
          <div className={s.orderInfo_ttl2}>{dict.amountLabel}</div>
          <div className={s.orderInfo_descr2}>
            {order?.totalSum} {currency}
          </div>
        </div>
        {order?.promocode && (
          <div className={s.sale_tttl}>
            <span className={s.one}>
              <Image src={sale_icon} width={22} height={14} alt="sale_icon" />
              <>
                {!!order?.promocode?.percentDiscount && (
                  <>
                    {dict.promocodeDiscount} {order?.promocode?.percentDiscount}%
                  </>
                )}
                {!!order?.promocode?.newPrice && (
                  <>
                    {dict.candyPrice} {order?.promocode?.newPrice}₴
                  </>
                )}
              </>
            </span>
            <span className={s.two}>- {sale} ₴</span>
          </div>
        )}
        <div className={s.orderInfo_pay}>
          <div className={s.orderInfo_ttl2}>
            <p className={s.ttl2_2}>{dict.deliveryTitle}</p>
            <p className={s.ttl2_2}>{dict.deliveryCarrierRate}</p>
          </div>
        </div>

        <div className={s.endBlock}>
          <div className={s.endBlock_wrap}>
            <div className={s.endBlock_o}>{dict.totalPaid}</div>
            <div className={s.endBlock_t}>{order.totalSum} ₴</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItemCard;
