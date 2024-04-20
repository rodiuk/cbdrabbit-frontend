
import Image from 'next/image';
import React from 'react';

import s from "./ProfileDetail.module.css";

import sale from "/public/img/sale.svg";
import CheckIcon from '@/components/icons/CheckIcon';

const ProfileDetail = () => {
	return (
		<div className={s.details}>
                                <div className={s.details_grey}>
                                    <p>Ви вже придбали на </p>
                                    <p className={s.details_big}>1375 ₴</p>
                                </div>
                                <div className={s.details_white}>
                                    <p>
                                        Чим більше цукерок ви купуєте - тим
                                        більшу знижку отримуєте! Це наш спосіб
                                        сказати Дякуємо!
                                    </p>
                                </div>
							<div className={s.details_img}>
							<Image src={sale} alt='sale' />
                                </div>
                                <div className={s.details_sales}>
                                    <div className={s.details_row}>
                                        <div className={s.details_ttl}>
                                            <p>
                                                <CheckIcon />
                                                Реєстрація
                                            </p>
                                        </div>
                                        <div className={s.details_descr}>
                                            <p>2% знижка</p>
                                        </div>
                                    </div>
                                    <div className={s.details_row}>
                                        <p className={s.details_bold}>
                                            Сума усіх покупок:
                                        </p>
                                    </div>
                                    <div className={s.details_row}>
                                        <div className={s.details_ttl}>
                                            <p>
											<CheckIcon />
                                                Від 1000₴
                                            </p>
                                        </div>
                                        <div className={s.details_descr}>
                                            <p>5% знижка</p>
                                        </div>
                                    </div>
                                    <div className={s.details_row}>
                                        <div className={s.details_ttl}>
                                            <p>Від 3000₴</p>
                                        </div>
                                        <div className={s.details_descr}>
                                            <p>7% знижка</p>
                                        </div>
                                    </div>
                                    <div className={s.details_row}>
                                        <div className={s.details_ttl}>
                                            <p>Від 5000₴</p>
                                        </div>
                                        <div className={s.details_descr}>
                                            <p>9% знижка</p>
                                        </div>
                                    </div>
                                    <div className={s.details_row}>
                                        <div className={s.details_ttl}>
                                            <p>Від 7000₴</p>
                                        </div>
                                        <div className={s.details_descr}>
                                            <p>12% знижка</p>
                                        </div>
                                    </div>
                                </div>
		</div>
		
		
	);
};

export default ProfileDetail;
