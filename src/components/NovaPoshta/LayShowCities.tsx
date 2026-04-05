import React from "react";
import { ICheckoutDict } from "@/interfaces/i18n.interface";

import InputNovaPoshta from "../Ui/InputNovaPoshta/InputNovaPoshta";

import s from "./s.module.css";
import { ArrowLeftIcon } from "../icons/ArrowLeft";

const LayShowCities = ({
  novaposhtaCities,
  close,
  sities,
  selectedCity,
  dict,
}: {
  novaposhtaCities: any;
  close: any;
  sities: any;
  selectedCity?: any;
  dict: ICheckoutDict;
}) => {
  const [isPopular, setIsPopular] = React.useState(false);

  const onClickPopular = (city: string, e: any) => {
    setIsPopular(true);
    novaposhtaCities(city);
  };

  React.useEffect(() => {
    if (sities.length && isPopular) {
      selectedCity({
        sity: sities[0].Present,
        deliveryCity: sities[0].DeliveryCity,
      });
    }
  }, [sities, isPopular]);

  const handleBadkdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      close();
    }
  };

  return (
    <>
      <div className={s.overl} onClick={e => handleBadkdropClick(e)}>
        <div className={s.content}>
          <div className={s.ttlRow}>
            <span className={s.close} onClick={() => close()}>
              <ArrowLeftIcon iconStyle={s.left} />
            </span>
            <div className="ttl">{dict.novaPoshta.cityTitle}</div>
          </div>
          <InputNovaPoshta
            type="text"
            name="city"
            placeholder={dict.novaPoshta.cityPlaceholder}
            novaposhtaCities={novaposhtaCities}
            setIsPopular={setIsPopular}
            target="cityInput"
          />
          <div className={s.start}>{dict.novaPoshta.cityHint}</div>
          <div className="list">
            {sities.length ? (
              <ul className={s.list}>
                {sities.map((sity: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className={s.li}
                      onClick={() =>
                        selectedCity({
                          sity: sity.Present,
                          deliveryCity: sity.DeliveryCity,
                        })
                      }
                    >
                      {sity.Present}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <>
                <div className={s.listTTl}>
                  {dict.novaPoshta.popularCitiesTitle}
                </div>
                <ul className={s.list}>
                  {dict.novaPoshta.popularCities.map((city, index) => (
                    <li
                      key={index}
                      data-popular={true}
                      className={s.li}
                      onClick={e => onClickPopular(city, e)}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LayShowCities;
