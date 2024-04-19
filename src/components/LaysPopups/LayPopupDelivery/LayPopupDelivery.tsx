import React from 'react';

import s from "./LayPopupDelivery.module.css";
import Input from '@/components/Ui/Input/Input';
import ButtonWhite from '@/components/Ui/Button/ButtonWhite';
import InputsBlockTelNameThirname from '@/components/InputsBlockTelNameThirname/InputsBlockTelNameThirname';
import NovaPoshta from '@/components/NovaPoshta/NovaPoshta';
import Image from 'next/image';

import np from "/public/img/np.svg";
import Button from '@/components/Ui/Button/Button';
import ButtonRed from '@/components/Ui/Button/ButtonRed';

const LayPopupDelivery = ({bottomBlock}: {bottomBlock: (e: string) => void}) => {
	const status = "1"
	return (
		<div className={s.overl}>
        <div className={s.content}>
		<div className={s.lay_wrap}>
					<div className={s.container}>
					<div className={s.lay_ttl}>
                            <p>
							Дані для автозаповнення доставки
                                <span
                                    className={s.close}
                                    onClick={() => bottomBlock("")}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='20'
                                        height='20'
                                        viewBox='0 0 20 20'
                                        fill='none'
                                    >
                                        <path
                                            d='M16 4L4 16M4 4L16 16'
                                            stroke='#98979A'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        />
                                    </svg>
                                </span>
                            </p>
                        </div>
						<InputsBlockTelNameThirname />
						<div className={s.checkoutBlock_np}>
            <Image src={np} alt="np" />
            <div className={s.checkoutBlock_ttl}>Нова Пошта</div>
          </div>
						<NovaPoshta />
						<div className={s.buttonBlock}>
							<ButtonRed text="Стерти дані доставки" />
						</div>
						<div className={s.buttonBlock}>
							<ButtonWhite text="Відміна" />
						</div>
						<div className={s.buttonBlock}>
							<Button text="Зберегти зміни" />
						</div>
            </div>
        </div>
        </div>
      </div>
	);
};

export default LayPopupDelivery;
