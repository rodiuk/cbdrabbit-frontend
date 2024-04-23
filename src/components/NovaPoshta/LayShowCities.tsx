import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import InputNovaPoshta from "../Ui/InputNovaPoshta/InputNovaPoshta";

import s from "./s.module.css";
import { ArrowLeftIcon } from "../icons/ArrowLeft";

const LayShowCities = ({
  novaposhtaCities,
  close,
  sities,
  selectedCity,
}: {
  novaposhtaCities: any;
  close: any;
  sities: any;
  selectedCity?: any;
	}) => {
	
	const [isPopular, setIsPopular] = React.useState(false)
	
		let citiesPopular = [
			"Київ",
			"Одеса",
			"Дніпро",
			"Харків",
			"Львів (Львівська обл.)",
			"Запоріжжя (Запорізька обл.,)",
			"Кривий Ріг (Дніпропетровська обл.)",
			"Миколаїв (Миколаївська обл)"
	];

	const onClickPopular = (city: string, e: any) => {
		console.log(e.target)
		console.log(e.currentTarget.dataset.popular)
		setIsPopular(true)
		novaposhtaCities(city)
	}

	React.useEffect(() => {
		if (sities.length && isPopular) {
			selectedCity({ sity: sities[0].Present, deliveryCity: sities[0].DeliveryCity })
			console.log(55555555)
		}
		console.log(sities)
	}, [sities, isPopular])
	
  return (
    <>
      <>
        <div className={s.content}>
          <div className={s.ttlRow}>
            <span className={s.close} onClick={() => close()}>
              <ArrowLeftIcon iconStyle={s.left} />
            </span>
            <div className="ttl">Населений пункт</div>
          </div>
          <InputNovaPoshta
            type="text"
            name="Населений пункт"
            placeholder="Введи населений пункт"
					  novaposhtaCities={novaposhtaCities}
					  setIsPopular={setIsPopular}
					  target="cityInput"
          />
          <div className={s.start}>
            Почни вводити назву населеного пункту від 3 букв
          </div>
          <div className="list">
            {sities.length ? (
				<ul className={s.list}>
					{sities.map((sity: any, index: number) => {
						return <li
							key={index}
							className={s.li}
							onClick={() => selectedCity({sity: sity.Present, deliveryCity: sity.DeliveryCity})}
						>{sity.Present}</li>
					})}
				</ul>
            ) : (
              <>
                <div className={s.listTTl}>Популярні населені пункти</div>
                <ul className={s.list}>
					{citiesPopular.map((city, index) => (
						<li
							key={index}
							data-popular={true}
							className={s.li}
							onClick={(e) => onClickPopular(city, e)}
						>{city}</li>
					))}
				</ul>
              </>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default LayShowCities;
