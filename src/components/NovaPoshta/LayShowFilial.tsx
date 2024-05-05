import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import InputNovaPoshta from "../Ui/InputNovaPoshta/InputNovaPoshta";

import s from "./s.module.css";
import { ArrowLeftIcon } from "../icons/ArrowLeft";
import errorRabbitIcon from "/public/img/errorRabbit.jpg";
import Image from "next/image";

const LayShowFilial = ({
	deliveryId,
	newPostNum,
	arrayNpFilials,
	selectedFilial,
  close,
}: {
	deliveryId: string
  close: () => void;
		newPostNum: (e: string) => void;
		arrayNpFilials: any[] 
		selectedFilial: (filial: string) => void
	}) => {
	
	const [emptyArray, setEmptyArray] = React.useState(false)
	
	let ttl;
	let placeholder
	if (deliveryId === "1") {
		ttl = "Відділення"
		placeholder = "Введи номер відділення"
	} else if (deliveryId === "2") {
		ttl = "Поштомат"
		placeholder = "Введи номер поштомата"
	}
	
	const errorRes = () => {
		setTimeout(() => {
			setEmptyArray(true)
		}, 2000);
	}
	
	//console.log(arrayNpFilials)
	//console.log(deliveryId, "LayShowFilial")
	const handleBadkdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.currentTarget === e.target) {
			close()
		}
	}

  return (
    <>
      <div className={s.overl}  onClick={e => handleBadkdropClick(e)}>
        <div className={s.content}>
          <div className={s.ttlRow}>
            <span className={s.close} onClick={() => close()}>
              <ArrowLeftIcon iconStyle={s.left} />
            </span>
					  <div className="ttl">{ttl}</div>
          </div>
          <InputNovaPoshta
            type="text"
            name="Населений пункт"
					  placeholder={placeholder}
					  newPostNum={newPostNum}
					  target="filialInput"
					  errorRes={errorRes}
          />
          {/* <div className={s.start}>errorRabbitIcon
            Почни вводити назву населеного пункту від 3 букв
          </div> */}
          <div className="list">
            {arrayNpFilials.length ? (
				<ul className={s.list}>
					{arrayNpFilials.map((filial: any, index: number) => {
						return <li
							key={index}
							className={s.li}
							onClick={() => selectedFilial(filial.Description)}
						>{filial.Description}</li>
					})}
				</ul>
            ) : null}
				  </div>
				  {emptyArray && !arrayNpFilials.length ? (
					 	 <div className={s.errorBlock}>
						  <div className={s.errorBlockPic}>
							  <Image src={errorRabbitIcon} className={s.image} alt="error" />
						  </div>
						  <div className={s.errTtl}>На жаль, за твоїм запитом нічого не знайдено</div>
						  <div className={s.errDescr}>Будь ласка, переконайся, що ввів все правильно, або спробуй змінити запит</div>
						</div>
				  ): null}
				  
        </div>
      </div>
    </>
  );
};

export default LayShowFilial;
