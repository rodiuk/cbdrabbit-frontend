"use client";
import InputRadio from "@/Ui/InputRadio/InputRadio";
import React from "react";
import { string } from "zod";

interface Options {
	id: string
	type: string
	name: string
	text: string
	value: string
	handleRadioChange: any
	checkedValue: string
}

const RadioButtonsContainer = ({ options }: { options: any }) => {
	const [selectedRadio, setSelectedRadio] = React.useState(""); // сюда текст от радиокнопки придет 1, 2. 3
	const handleRadioChange = (value: string) => {
        setSelectedRadio(value);
    };
  return (
	  <div>
		  
		  <ul>
			  {options && options.map((el: Options) => {
				  return <li key={el.id}>
					  <InputRadio
						  id={el.id}
						  type={el.type}
						  name={el.name}
						  text={el.text}
						  value={el.value}
						  handleRadioChange={handleRadioChange}
						  checkedValue={selectedRadio}
					  />
				  </li>
			  })}
		  </ul>
      
    </div>
  );
};

export default RadioButtonsContainer;
