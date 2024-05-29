import React from "react";
import { usePathname, useRouter } from "next/navigation";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import Input from "@/components/Ui/Input/Input";
import { IProfileDict } from "@/interfaces/i18n.interface";
import { maskEmailAddress } from "@/utils/maskEmailAddress";
import { updateEmailRequest } from "@/libs/api/user.api";
import { useSession } from "next-auth/react";

import s from "./LayPopupOrderInfo.module.css";
import Button from "@/components/Ui/Button/Button";
import CheckIcon from "@/components/icons/CheckIcon";
import { CloseRedIcon } from "@/components/icons/CloseRedIcon";

interface Props {
	closePoup: () => void;
	handleBadkdropClick: any
}

const LayPopupOrderInfo = ({ closePoup, handleBadkdropClick }: Props): React.JSX.Element => {
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
              <div className={s.number_order}>№ 00124456</div>
              <div className="comment_block">
                <div className={s.comment_ttl}>Коментар</div>
                <div className={s.comment_context}>Відсутній</div>
              </div>

              <div className={s.number_pos}>Посилка №: 20 4003 9139 7777</div>
              <div className={s.bdr}>
                <div className={s.st_ttl}>Статус</div>
                <div className="statuses">
                  <div className={s.status}>
                    <div className={s.status1}>
                      <CheckIcon /> Оплачений
                    </div>
                    <div className={s.status2}>17.03.24, 11:52</div>
                  </div>
                  <div className={s.status}>
                    <div className={s.status1}>
                      <CheckIcon /> Комплектується
                    </div>
                  </div>
                  <div className={s.status}>
                    <div className={s.status1}>
                      <CheckIcon /> Відправлено
                    </div>
                    <div className={s.status2}>17.03.24, 11:52</div>
                  </div>
                  <div className={s.status}>
                    <div className={s.status1}>
                      <CheckIcon /> Доставлено
                    </div>
                    <div className={s.status2}>17.03.24, 11:52</div>
								  </div>
                  <div className={s.status}>
                    <div className={s.status1}>
                      <CheckIcon /> Отримано
                    </div>
                    <div className={s.status2}>17.03.24, 11:52</div>
                  </div>
                  <div className={s.status}>
                    <div className={`${s.status1} ${s.red_text}`}>
                      <CheckIcon iconStyle={s.red_check} /> Не отримано
                    </div>
                    <div className={s.status2}>17.03.24, 11:52</div>
                  </div>
                  <div className={s.status}>
                    <div className={`${s.status1} ${s.red_text}`}>
                      <CloseRedIcon iconStyle={s.red_check} /> Кошти повернуто
                    </div>
                    <div className={s.status2}>17.03.24, 11:52</div>
                  </div>
								  <div className={s.red_info}>Зберігається до 21.03.24, 11:52</div>
								  <div className={s.grey_info}>Отримано </div>
								  <div className={s.warning}>Посилку повернуто назад, кошти буде повернуто впродовж 7 днів</div>
                </div>
              </div>
              <div className={s.bdr}>
                <div className={s.st_ttl}>Отримувач замовлення</div>
                <div className={s.info}>
                  <p>Іванюк Іван</p>
                  <p>+380633433131</p>
                  <p>Київ, Поштомат 123</p>
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
