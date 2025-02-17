import React from "react";
import { format } from "date-fns";
import { OrderStatus } from "@prisma/client";
import Button from "@/components/Ui/Button/Button";
import CheckIcon from "@/components/icons/CheckIcon";
import { IUserOrder } from "@/interfaces/order.interface";
import { CloseRedIcon } from "@/components/icons/CloseRedIcon";
import { formatDisplayedCheckId } from "@/utils/formatDisplayedCheckId";

import s from "./LayPopupOrderInfo.module.css";
import { toZonedTime } from "date-fns-tz";
import { appConfig } from "@/configs/app.config";

interface Props {
  order: IUserOrder;
  closePoup: () => void;
  handleBadkdropClick: any;
}

const LayPopupOrderInfo = ({
  order,
  closePoup,
  handleBadkdropClick,
}: Props): React.JSX.Element => {
  const statuses = React.useMemo(() => {
    const created = order?.orderStatusHistory?.find(
      status => status.status === OrderStatus.CREATED
    );
    const paid = order?.orderStatusHistory?.find(
      status => status.status === OrderStatus.PAID
    );
    const completed = order?.orderStatusHistory?.find(
      status => status.status === OrderStatus.COMPLETED
    );
    const canceled = order?.orderStatusHistory?.find(
      status => status.status === OrderStatus.CANCELED
    );
    const sended = order?.orderStatusHistory?.find(
      status => status.status === OrderStatus.SENDED
    );
    const delivered = order?.orderStatusHistory?.find(
      status => status.status === OrderStatus.DELIVERED
    );
    const success = order?.orderStatusHistory?.find(
      status => status.status === OrderStatus.SUCCESS
    );

    return {
      created,
      paid,
      completed,
      canceled,
      sended,
      delivered,
      success,
    };
  }, [order]);

  console.log("statuses", statuses);

  return (
    <div className={s.overl} onClick={e => handleBadkdropClick(e)}>
      <div className={s.content}>
        <div className={s.lay_wrap}>
          <div className={s.container}>
            <div className={s.flexLay}>
              <div className={s.lay_ttl}>
                <p>
                  Деталі замовлення
                  <span className={s.close} onClick={() => closePoup()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M16 4L4 16M4 4L16 16"
                        stroke="#98979A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </p>
              </div>
              <div className={s.number_order}>
                № {formatDisplayedCheckId(order?.checkId)}
              </div>
              <div className="comment_block">
                <div className={s.comment_ttl}>Коментар</div>
                <div className={s.comment_context}>
                  {order?.comment || "Відсутній"}
                </div>
              </div>

              {order?.deliveryInfo?.trackingNumber && (
                <div className={s.number_pos}>
                  Посилка №: {order?.deliveryInfo?.trackingNumber}
                </div>
              )}
              <div className={s.bdr}>
                <div className={s.st_ttl}>Статус</div>
                <div className="statuses">
                  {statuses?.created && (
                    <div className={s.status}>
                      <div className={s.status1}>
                        <CheckIcon /> Створений
                      </div>
                      <div className={s.status2}>
                        {format(
                          toZonedTime(
                            statuses?.created.updatedAt,
                            appConfig.CURRENT_TIMEZONE
                          ),
                          "dd.MM.yyyy HH:mm"
                        )}
                      </div>
                    </div>
                  )}
                  {statuses?.paid?.updatedAt && (
                    <div className={s.status}>
                      <div className={s.status1}>
                        <CheckIcon /> Оплачений
                      </div>
                      <div className={s.status2}>
                        {format(
                          toZonedTime(
                            statuses?.paid.updatedAt,
                            appConfig.CURRENT_TIMEZONE
                          ),
                          "dd.MM.yyyy HH:mm"
                        )}
                      </div>
                    </div>
                  )}

                  {statuses?.completed?.updatedAt && (
                    <div className={s.status}>
                      <div className={s.status1}>
                        <CheckIcon /> Комплектується
                      </div>
                      <div className={s.status2}>
                        {format(
                          toZonedTime(
                            statuses?.completed.updatedAt,
                            appConfig.CURRENT_TIMEZONE
                          ),
                          "dd.MM.yyyy HH:mm"
                        )}
                      </div>
                    </div>
                  )}

                  {statuses?.sended?.updatedAt && (
                    <div className={s.status}>
                      <div className={s.status1}>
                        <CheckIcon /> Відправлено
                      </div>
                      <div className={s.status2}>
                        {format(
                          toZonedTime(
                            statuses?.sended.updatedAt,
                            appConfig.CURRENT_TIMEZONE
                          ),
                          "dd.MM.yyyy HH:mm"
                        )}
                      </div>
                    </div>
                  )}

                  {statuses?.delivered?.updatedAt && (
                    <div className={s.status}>
                      <div className={s.status1}>
                        <CheckIcon /> Доставлено
                      </div>
                      <div className={s.status2}>
                        {format(
                          statuses?.delivered.updatedAt,
                          "dd.MM.yy, HH:mm"
                        )}
                      </div>
                    </div>
                  )}

                  {statuses?.success?.updatedAt && (
                    <div className={s.status}>
                      <div className={s.status1}>
                        <CheckIcon /> Отримано
                      </div>
                      <div className={s.status2}>
                        {format(statuses?.success.updatedAt, "dd.MM.yy, HH:mm")}
                      </div>
                    </div>
                  )}

                  {/* <div className={s.status}>
                    <div className={`${s.status1} ${s.red_text}`}>
                      <CheckIcon iconStyle={s.red_check} /> Не отримано
                    </div>
                    <div className={s.status2}>17.03.24, 11:52</div>
                  </div> */}

                  {/* <div className={s.status}>
                    <div className={`${s.status1} ${s.red_text}`}>
                      <CloseRedIcon iconStyle={s.red_check} /> Кошти повернуто
                    </div>
                    <div className={s.status2}>17.03.24, 11:52</div>
                  </div> */}
                  {/* <div className={s.red_info}>
                    Зберігається до 21.03.24, 11:52
                  </div> */}

                  {/* <div className={s.grey_info}>Отримано </div> */}
                  {statuses?.canceled && (
                    <div className={s.warning}>
                      Посилку повернуто назад. Якщо за товар було оплачено
                      кошти, їх буде повернено впродовж 7 днів
                    </div>
                  )}
                </div>
              </div>
              <div className={s.bdr}>
                <div className={s.st_ttl}>Отримувач замовлення</div>
                <div className={s.info}>
                  <p>
                    {order?.user?.firstName} {order?.user?.lastName}
                  </p>
                  {order?.user?.address?.phoneNumber && (
                    <p>{order?.user?.address?.phoneNumber}</p>
                  )}
                  <p>
                    {`${order?.user?.address?.city}, `}
                    {`${order?.user?.address?.npDepartment}`}
                  </p>
                </div>
              </div>
              <div className={s.buttonBlock} onClick={() => closePoup()}>
                <Button text="Закрити" className={s.button} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayPopupOrderInfo;
