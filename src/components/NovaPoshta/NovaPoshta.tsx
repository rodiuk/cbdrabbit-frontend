"use client";

import React from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import LayShowCities from "./LayShowCities";
import LayShowFilial from "./LayShowFilial";
import Input from "../Ui/Input/Input";
import { npDeliveryType } from "./npDelivery";

import RadioButtonsContainer from "../RadioButtonsContainer/RadioButtonsContainer";

import s from "./s.module.css";

interface Props {
  city: string;
  postPoint: string;
  setCity: (city: string) => void;
  setPostPoint: (postPoint: string) => void;
  deliveryId: string;
  setDeliveryId: (deliveryId: string) => void;
}

const NovaPost = (props: Props): React.JSX.Element => {
  const { city, setCity, postPoint, setPostPoint, deliveryId, setDeliveryId } =
    props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenFilial, setIsOpenFilial] = React.useState(false);
  const [sities, setSities] = React.useState([]);
  const [deliveryRef, setDeliveryRef] = React.useState("");
  const [arrayNpFilials, setArrayNpFilials] = React.useState([]);

  const handleRadioChange = (id: string) => {
    setDeliveryId(id);
    console.log(id);
  };

  const close = () => {
    setIsOpen(false);
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
	  newPostNum("1")
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
      apiKey: "5f7142ac0b82581bc8ac1ece8253bf11",
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
      apiKey: "5f7142ac0b82581bc8ac1ece8253bf11",
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
        console.log("Успешный ответ:", response.data.data);
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
          />

          <Input
            type="text"
            text="Відділення"
            required={true}
            name="Відділення"
            placeholder="Введи номер відділення"
            showLay={showLayFilial}
            autoComplete="off"
            value={postPoint}
          />
        </>
      )}

      <AnimatePresence mode="wait">
        {isOpen ? ( // для выбора города
          <motion.div
            //className={s.overl}
            style={{ height: "100vh" }}
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
            />
          </motion.div>
        ) : null}
        {isOpenFilial ? (
          <motion.div
            className={s.overl}
            style={{ height: "100vh" }}
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
