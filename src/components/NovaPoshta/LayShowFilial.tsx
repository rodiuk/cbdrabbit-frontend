import React from "react";
import Image from "next/image";
import { ICheckoutDict } from "@/interfaces/i18n.interface";
import InputNovaPoshta from "../Ui/InputNovaPoshta/InputNovaPoshta";
import { ArrowLeftIcon } from "../icons/ArrowLeft";

import s from "./s.module.css";
import errorRabbitIcon from "/public/img/errorRabbit.jpg";

const LayShowFilial = ({
  deliveryId,
  newPostNum,
  arrayNpFilials,
  selectedFilial,
  close,
  dict,
}: {
  deliveryId: string;
  close: () => void;
  newPostNum: (e: string) => void;
  arrayNpFilials: any[];
  selectedFilial: (filial: string) => void;
  dict: ICheckoutDict;
}) => {
  const [emptyArray, setEmptyArray] = React.useState(false);

  let ttl;
  let placeholder;
  if (deliveryId === "1") {
    ttl = dict.novaPoshta.branchTitle;
    placeholder = dict.novaPoshta.branchPlaceholder;
  } else if (deliveryId === "2") {
    ttl = dict.novaPoshta.parcelLockerTitle;
    placeholder = dict.novaPoshta.parcelLockerPlaceholder;
  }

  const errorRes = () => {
    setTimeout(() => {
      setEmptyArray(true);
    }, 2000);
  };

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
            <div className="ttl">{ttl}</div>
          </div>
          <InputNovaPoshta
            type="text"
            name="postPoint"
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
                  return (
                    <li
                      key={index}
                      className={s.li}
                      onClick={() => selectedFilial(filial.Description)}
                    >
                      {filial.Description}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
          {emptyArray && !arrayNpFilials.length ? (
            <div className={s.errorBlock}>
              <div className={s.errorBlockPic}>
                <Image src={errorRabbitIcon} className={s.image} alt="error" />
              </div>
              <div className={s.errTtl}>{dict.novaPoshta.noResultsTitle}</div>
              <div className={s.errDescr}>
                {dict.novaPoshta.noResultsDescription}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default LayShowFilial;
