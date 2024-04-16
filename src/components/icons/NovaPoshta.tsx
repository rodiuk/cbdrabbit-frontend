'use client'
import React from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import InputNovaPoshta from "../Ui/InputNovaPoshta/InputNovaPoshta";
import RadioButtonsContainer from "../RadioButtonsContainer/RadioButtonsContainer";

import s from "./s.module.css";
import LayShow from "./LayShow";

const NovaPoshta = () => {
	const [deliveryId, setDeliveryId] = React.useState("")
	const [isOpen, setIsOpen] = React.useState(false)

	
	const handleRadioChange = (id: string) => {
		setDeliveryId(id);
		console.log(id)
		setIsOpen(true)
	};

	const close = () => {
		setIsOpen(false)
	}
	
	const novaposhtaCities = (e: string) => {
        let requestData = {
            apiKey: "b8468b363951e2f035a2f38c961bb23a",
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
            .then((response) => {
                console.log("Успешный ответ:", response.data.data[0].Addresses);
                //setCities(response.data.data[0].Addresses);
            })
            .catch((error) => {
                console.error("Ошибка при отправке запроса:", error);
            });
    };
  return (
    <>
      <RadioButtonsContainer
        options={[
          {
            id: "1",
            type: "radio",
            name: "Спосіб доставки",
            text: "У відділення",
            value: "У відділення",
          },
          {
            id: "2",
            type: "radio",
            name: "Спосіб доставки",
            text: "У поштомат",
            value: "Поштомат",
          },
          {
            id: "3",
            type: "radio",
            name: "Спосіб доставки",
            text: "Кур'єром",
            value: "Кур'єром",
          },
			  ]}
			  handleRadioChange={handleRadioChange}
			  deliveryId={deliveryId}
      />

      <InputNovaPoshta
        type="text"
        name="Населений пункт"
        text="Населений пункт"
			  required={true}
			  novaposhtaCities={novaposhtaCities}
		  />
		  <input type="text"  name="Населений пункт" />
      <InputNovaPoshta
        type="text"
        name="Відділення"
        text="Відділення"
        required={true}
		  />
		  
		  <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
					  className={s.overl}
					  style={{ height: '100vh' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
				  >
					  <LayShow
						  novaposhtaCities={novaposhtaCities}
						  close={close}
					  />
				  </motion.div>
				  
      ) : null}
    </AnimatePresence>
    </>
  );
};

export default NovaPoshta;
