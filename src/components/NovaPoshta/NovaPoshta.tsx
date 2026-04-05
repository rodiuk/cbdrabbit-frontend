"use client";

import React, { useEffect } from "react";
import axios from "axios";
import Input from "../Ui/Input/Input";
import LayShowCities from "./LayShowCities";
import LayShowFilial from "./LayShowFilial";
import { normalizeNpDeliveryId, npDeliveryType } from "./npDelivery";
import { appConfig } from "@/configs/app.config";
import { AnimatePresence, motion } from "framer-motion";
import { ICheckoutDict } from "@/interfaces/i18n.interface";

import RadioButtonsContainer from "../RadioButtonsContainer/RadioButtonsContainer";

interface Props {
  city: string;
  postPoint: string;
  setCity: (city: string) => void;
  setPostPoint: (postPoint: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (deliveryAddress: string) => void;
  deliveryId: string;
  setDeliveryId: (deliveryId: string) => void;
  validateData?: any;
  dict: ICheckoutDict;
}

const NovaPost = (props: Props): React.JSX.Element => {
  const {
    city,
    setCity,
    postPoint,
    deliveryAddress,
    setDeliveryAddress,
    setPostPoint,
    deliveryId,
    setDeliveryId,
    validateData,
    dict,
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenFilial, setIsOpenFilial] = React.useState(false);
  const [sities, setSities] = React.useState<any[]>([]);
  const [deliveryRef, setDeliveryRef] = React.useState("");
  const [arrayNpFilials, setArrayNpFilials] = React.useState<any[]>([]);

  // Підвантажуємо філіали при зміні міста або типу доставки
  useEffect(() => {
    if (deliveryRef && deliveryId !== "3") {
      newPostNum("");
    }
  }, [deliveryRef, deliveryId]);

  const handleRadioChange = (id: string) => {
    setDeliveryId(id);
    setArrayNpFilials([]);
    setPostPoint("");
  };

  const close = () => {
    setIsOpen(false);
    setIsOpenFilial(false);
  };
  const showLay = () => {
    setIsOpen(true);
    setSities([]);
    setCity("");
    setDeliveryRef("");
    setPostPoint("");
    setArrayNpFilials([]);
  };
  const showLayFilial = () => {
    setIsOpenFilial(true);
  };

  const selectedCity = (obj: any) => {
    setCity(obj.sity);
    setDeliveryRef(obj.deliveryCity);
    setIsOpen(false);
  };

  const selectedFilial = (filial: string) => {
    setPostPoint(filial);
    setIsOpenFilial(false);
  };

  const novaposhtaCities = (e: string) => {
    const requestData = {
      apiKey: appConfig.NOVA_POSHTA,
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: e,
        Limit: 15,
      },
    };

    axios
      .post("https://api.novaposhta.ua/v2.0/json/", requestData)
      .then(response => {
        setSities(response.data.data[0].Addresses);
      })
      .catch(error => {
        console.error("Ошибка при отправке запроса:", error);
      });
  };

  const newPostNum = (filter: string = "") => {
    const requestData = {
      apiKey: appConfig.NOVA_POSHTA,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityRef: deliveryRef,
        Language: "ua",
      },
    };

    axios
      .post("https://api.novaposhta.ua/v2.0/json/", requestData)
      .then(response => {
        const byType = response.data.data.filter((el: any) =>
          deliveryId === "1"
            ? el.CategoryOfWarehouse.includes("Branch")
            : el.CategoryOfWarehouse.includes("Postomat")
        );
        const filtered = filter
          ? byType.filter((el: any) => el.Number.includes(filter))
          : byType;
        setArrayNpFilials(filtered);
      })
      .catch(err => console.error("Ошибка при отправке запроса:", err));
  };

  const deliveryOptions = React.useMemo(
    () => [
      {
        ...npDeliveryType[0],
        name: dict.novaPoshta.deliveryMethodLabel,
        text: dict.novaPoshta.branch,
        value: dict.novaPoshta.branch,
      },
      {
        ...npDeliveryType[1],
        name: dict.novaPoshta.deliveryMethodLabel,
        text: dict.novaPoshta.parcelLocker,
        value: dict.novaPoshta.parcelLocker,
      },
      {
        ...npDeliveryType[2],
        name: dict.novaPoshta.deliveryMethodLabel,
        text: dict.novaPoshta.courier,
        value: dict.novaPoshta.courier,
      },
    ],
    [dict]
  );

  const normalizedDeliveryId = normalizeNpDeliveryId(deliveryId);

  return (
    <>
      <RadioButtonsContainer
        options={deliveryOptions}
        handleRadioChange={handleRadioChange}
        deliveryId={normalizedDeliveryId}
      />

      {normalizedDeliveryId && (
        <>
          <Input
            type="text"
            text={dict.novaPoshta.cityTitle}
            required
            name="city"
            placeholder={dict.novaPoshta.cityPlaceholder}
            showLay={showLay}
            autoComplete="off"
            value={city}
            validateData={validateData}
            readOnly
            isCity={city}
          />

          {normalizedDeliveryId === "3" ? (
            <Input
              type="text"
              text={dict.novaPoshta.addressTitle}
              required
              name="address"
              value={deliveryAddress}
              onInputChange={setDeliveryAddress}
              placeholder={dict.novaPoshta.addressPlaceholder}
              autoComplete="off"
              validateData={validateData}
            />
          ) : (
            <Input
              type="text"
              text={
                normalizedDeliveryId === "1"
                  ? dict.novaPoshta.branchTitle
                  : dict.novaPoshta.parcelLockerTitle
              }
              required
              name="postPoint"
              placeholder={
                normalizedDeliveryId === "1"
                  ? dict.novaPoshta.branchPlaceholder
                  : dict.novaPoshta.parcelLockerPlaceholder
              }
              showLay={showLayFilial}
              autoComplete="off"
              value={postPoint}
              validateData={validateData}
              readOnly
              isPostPoint={postPoint}
            />
          )}
        </>
      )}

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LayShowCities
              novaposhtaCities={novaposhtaCities}
              close={close}
              sities={sities}
              selectedCity={selectedCity}
              dict={dict}
            />
          </motion.div>
        )}

        {isOpenFilial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LayShowFilial
              close={close}
              deliveryId={deliveryId}
              newPostNum={newPostNum}
              arrayNpFilials={arrayNpFilials}
              selectedFilial={selectedFilial}
              dict={dict}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NovaPost;
