import React from 'react';

import s from "./LayPopupEmail.module.css";
import Input from '@/components/Ui/Input/Input';
import ButtonWhite from '@/components/Ui/Button/ButtonWhite';

const LayPopupEmail = ({bottomBlock}: {bottomBlock: (e: string) => void}) => {
	let status =  "2"
	return (
		<div className={s.overl}>
        <div className={s.content}>
		<div className={s.lay_wrap}>
            <div className={s.container}>
                {status === "1" ? (
                    <div className={s.flexLay}>
                        <div className={s.lay_ttl}>
                            <p>
                                Змінити Email
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

                        <div className={s.lay_text}>
                            <p>
                                Вкажи який email ти хочеш замість
                                ojo*****@gmail.com
                            </p>
                        </div>
                        <Input
                            type='text'
                            text='Новий Email'
                            placeholder='Введи новий Email'
                        />
                        <div className={s.buttonBlock}>
                            <p className={s.bbt}>
                                Ми вишлемо лист з лінком для підтвердження на
                                пошту
									</p>
									<ButtonWhite text="Змінити" />
                        </div>
                    </div>
                ) : status === "2" ? (
                    <div className={s.flexLay}>
                        <div className={s.lay_ttl}>
                            <p>
                                Змінити Email
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

                        <div className={s.lay_text}>
                            <p>
                                Вкажи який email ти хочеш замість
                                ojo*****@gmail.com
                            </p>
                        </div>
                        <Input
                            type='text'
                            text='Новий Email'
                            placeholder='Введи новий Email'
                        />
                        <div className={s.buttonBlock}>
						<p className={s.bbt}>
                                Ми вишлемо лист з лінком для підтвердження на
                                пошту
									</p>
                            <ButtonWhite text="Змінити" />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
        </div>
      </div>
	);
};

export default LayPopupEmail;
