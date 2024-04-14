"use client";
import React from "react";
import cn from "clsx";
import s from "./s.module.css";
import EyeClosed from "@/components/icons/EyeClosed";
import EyeOpened from "@/components/icons/EyeOpened";

interface InputProps {
	id: string;
value: string;
  text: string;
  type: string;
  name: string;
	handleRadioChange: any;
	checkedValue: string
}

const InputRadio: React.FC<InputProps> = ({
	id,
	text,
	handleRadioChange,
	checkedValue,
  ...input
}) => {



  const handlerInput = (id: string) => {
	  handleRadioChange(id)
  };

 

  return (
    <label
      className={cn(s.label , {
		  error: false,
		  [s.active]: checkedValue === id,
		  [s.radio]: true
      })}
    >
      <p className={s.label_ttl}>
        {text}
      </p>
      <input
        className={s.input}
        {...input}
        onChange={e => handlerInput(id)}
        type={input.type}
			  value={input.value}
			  checked={checkedValue === id}
      />

    </label>
  );
};

export default InputRadio;
