import React from 'react';

import s from "./LayPopupPassword.module.css";
import Input from '@/components/Ui/Input/Input';
import ButtonWhite from '@/components/Ui/Button/ButtonWhite';

const LayPopupPassword = ({bottomBlock}: {bottomBlock: (e: string) => void}) => {
	
	return (
		<div className={s.overl}>
        <div className={s.content}>
		<div className={s.lay_wrap}>
            <div className={s.container}>
			<div className={s.flexLay}>
                    <div className={s.lay_ttl}>
                        <p>
						Встановити новий пароль
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
							
							<Input
								type="text"
								text="Старий пароль"
								placeholder='Введи старий пароль'
								isPassword
								password={true}
								errorText="Не правильно введений пароль"
    						  />
							
							<Input
								type="text"
								text="Новий пароль"
								placeholder='Введи новий пароль'
							/>
							
							<Input
								type="text"
								placeholder='Підтверди новий пароль'
								errorText="Паролі не співпадають"
    						  />
					
                    <div className='button-block'>
                       
                        <ButtonWhite text="Встановити" />
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
	);
};

export default LayPopupPassword;
