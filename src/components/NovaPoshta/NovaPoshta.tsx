'use client'
import React from "react";
import InputNovaPoshta from "../Ui/InputNovaPoshta/InputNovaPoshta";
import RadioButtonsContainer from "../RadioButtonsContainer/RadioButtonsContainer";

const NovaPoshta = () => {
	const [deliveryId, setDeliveryId] = React.useState("")

	
	const handleRadioChange = (id: string) => {
		setDeliveryId(id);
		console.log(id)
	};
	
	const novaposhtaCities = (e) => {
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
                console.log("Успешный ответ:", "");
                setCities(response.data.data[0].Addresses);
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
      />
      <InputNovaPoshta
        type="text"
        name="Відділення"
        text="Відділення"
        required={true}
      />
    </>
  );
};

export default NovaPoshta;
