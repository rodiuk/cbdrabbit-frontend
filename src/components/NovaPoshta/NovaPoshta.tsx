"use client";

import React from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import LayShowCities from "./LayShowCities";
import LayShowFilial from "./LayShowFilial";
import Input from "../Ui/Input/Input";
import { npDeliveryType } from "./npDelivery";

import RadioButtonsContainer from "../RadioButtonsContainer/RadioButtonsContainer";
import { appConfig } from "@/configs/app.config";

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
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenFilial, setIsOpenFilial] = React.useState(false);
  const [sities, setSities] = React.useState([]);
  const [deliveryRef, setDeliveryRef] = React.useState("");
  const [arrayNpFilials, setArrayNpFilials] = React.useState([]);

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
    newPostNum("1");
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
    let requestData = {
      apiKey: appConfig.NOVA_POSHTA,
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: e,
        Limit: 15,
      },
    };

    let settings = {
      method: "post",
      url: "https://api.novaposhta.ua/v2.0/json/",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestData,
    };
    axios(settings)
      .then(response => {
        setSities(response.data.data[0].Addresses);
      })
      .catch(error => {
        console.error("Ошибка при отправке запроса:", error);
      });
  };

  const newPostNum = (e: any) => {
    let requestData = {
      apiKey: appConfig.NOVA_POSHTA,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        //CityRef: cityRef,
        CityRef: deliveryRef,
        Language: "ua",
      },
    };

    // Настройка параметров запроса
    let settings = {
      method: "post",
      url: "https://api.novaposhta.ua/v2.0/json/",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestData,
    };
    axios(settings)
      .then(response => {
        let results;
        if (deliveryId === "1") {
          results = response.data.data.filter((el: any) =>
            el.CategoryOfWarehouse.includes("Branch")
          );
        } else if (deliveryId === "2") {
          results = response.data.data.filter((el: any) =>
            el.CategoryOfWarehouse.includes("Postomat")
          );
        }
        const filteredData = results.filter((el: any) => el.Number.includes(e));
        setArrayNpFilials(filteredData);
      })
      .catch(error => {
        console.error("Ошибка при отправке запроса:", error);
      });
  };

  return (
    <>
      <RadioButtonsContainer
        options={npDeliveryType}
        handleRadioChange={handleRadioChange}
        deliveryId={deliveryId}
      />

      {deliveryId && (
        <>
          <Input
            type="text"
            text="Населений пункт"
            required={true}
            name="Населений пункт"
            placeholder="Введи населений пункт"
            showLay={showLay}
            autoComplete="off"
            value={city}
            validateData={validateData}
            readOnly
            isCity={city}
          />

          {deliveryId === "3" ? (
            <Input
              type="text"
              text="Адреса"
              required={true}
              name="Адреса"
              value={deliveryAddress}
              onInputChange={(e: string) => setDeliveryAddress(e)}
              placeholder="Введи адресу"
              //  showLay={showLayFilial}
              autoComplete="off"
              validateData={validateData}

              //value={postPoint}
            />
          ) : (
            <Input
              type="text"
              text="Відділення"
              required={true}
              name="Відділення"
              placeholder="Введи номер відділення"
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
        {isOpen ? ( // для выбора города
          <motion.div
            //style={{ height: "100vh" }} этот стиль удлиняет блок, убираем его
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1 /*  position: "absolute", width: "100%", height: "100vh", left: 0, top: 0  */,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LayShowCities
              novaposhtaCities={novaposhtaCities}
              close={close}
              sities={sities}
              selectedCity={selectedCity}
            />
          </motion.div>
        ) : null}
        {isOpenFilial ? (
          <motion.div
            //style={{ height: "100vh" }}  этот стиль удлиняет блок, убираем его
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
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default NovaPost;
