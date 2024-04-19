import React from 'react';

import s from "./LayPopupDeleteAkk.module.css";
import Input from '@/components/Ui/Input/Input';
import ButtonWhite from '@/components/Ui/Button/ButtonWhite';
import ButtonRed from '@/components/Ui/Button/ButtonRed';

import deleteAkkIcon from "/public/img/deleteAkk.svg";
import Image from 'next/image';

const LayPopupDeleteAkk = ({bottomBlock}: {bottomBlock: (e: string) => void}) => {
	
	return (
		<div className={s.overl}>
        <div className={s.content}>
		<div className={s.lay_wrap}>
            <div className={s.container}>
			<div className={s.flexLay}>
                    <div className='lay_ttl'>
                        <p>
                            Видалити акаунт
                            <span
                                className='close'
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
                    <div className='lay_img'>
                        <Image src={deleteAkkIcon} alt='delet' />
                    </div>
                    <div className={s.lay_text}>
                        <p>Ви впевнені що хочете видалити акаунт?</p>
                    </div>
                    <div className='button-block'>
                        <ButtonWhite text="Не хочу видаляти 🥺" />
						<ButtonRed text="Видалити 😭" />
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
	);
};

export default LayPopupDeleteAkk;
