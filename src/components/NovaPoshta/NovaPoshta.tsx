'use client'
import React from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import InputNovaPoshta from "../Ui/InputNovaPoshta/InputNovaPoshta";
import RadioButtonsContainer from "../RadioButtonsContainer/RadioButtonsContainer";

import s from "./s.module.css";
import Input from "../Ui/Input/Input";
import LayShowCities from "./LayShowCities";
import LayShowFilial from "./LayShowFilial";

const NovaPoshta = () => {
	const [deliveryId, setDeliveryId] = React.useState("")
	const [isOpen, setIsOpen] = React.useState(false)
	const [isOpenFilial, setIsOpenFilial] = React.useState(false)
	const [sities, setSities] = React.useState([])
	const [sity, setSity] = React.useState("")
	const [deliveryRef, setDeliveryRef] = React.useState("")
	const [arrayNpFilials, setArrayNpFilials] = React.useState([])
	const [filial, setFilial] = React.useState("")

	
	const handleRadioChange = (id: string) => {
		setDeliveryId(id);
		console.log(id)
	};

	const close = () => {
		setIsOpen(false)
		setIsOpenFilial(false)
	}
	const showLay = () => {
		setIsOpen(true)
		setSities([])
		setSity("")
		setDeliveryRef("")
		setFilial("")
		setArrayNpFilials([])
	}
	const showLayFilial = () => {
		setIsOpenFilial(true)
	}
	const selectedCity = (obj: any) => {
		setSity(obj.sity)
		setDeliveryRef(obj.deliveryCity)
		setIsOpen(false)
	}
	

	const selectedFilial = (filial: string) => {
		setFilial(filial)
		setIsOpenFilial(false)
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
                setSities(response.data.data[0].Addresses);
            })
            .catch((error) => {
                console.error("Ошибка при отправке запроса:", error);
            });
	};

	const newPostNum = (e: any) => {
       console.log(e);
        let requestData = {
            apiKey: "b8468b363951e2f035a2f38c961bb23a",
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
            .then((response) => {
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
                const filteredData = results.filter((el : any) =>
                    el.Number.includes(e)
                );
                console.log(e);
				console.log(filteredData);
				setArrayNpFilials(filteredData)
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
			  value={sity}
		  />

		  <Input
			  type="text"
			  text="Відділення"
			  required={true}
			  name="Відділення"
			  placeholder="Введи номер відділення"
			 showLay={showLayFilial}
			  autoComplete="off"
			  value={filial}
		  />
			  </>
	  )}
		  
		  
      
		  <AnimatePresence mode="wait">
      {isOpen ? ( // для выбора города
        <motion.div
					  className={s.overl}
					  style={{ height: '100vh' }}
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
					  style={{ height: '100vh' }}
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

export default NovaPoshta;
