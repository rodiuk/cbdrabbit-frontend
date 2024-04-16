"use client";
import React from "react";
import cn from "clsx";
import s from "./s.module.css";
import EyeClosed from "@/components/icons/EyeClosed";
import EyeOpened from "@/components/icons/EyeOpened";
import { SearchIcon } from "@/components/icons/SearchIcon";

interface InputProps {
  text?: string;
  required?: boolean;
  type?: string;
  name?: string;
  placeholder?: string;
  password?: boolean;
  isPassword?: boolean;
  novaposhtaCities?: any;
  setIsPopular?: any;
}

const InputNovaPoshta: React.FC<InputProps> = ({
  text,
  required,
  password,
  isPassword,
  novaposhtaCities,
  setIsPopular,
	...input
}) => {
  const [value, setValue] = React.useState("");
  const [type, setType] = React.useState(input.type);

  // const [validate, setValidate] = React.useState(true)

  const handlerInput = (e: any) => {
    setValue(e.target.value);
	  novaposhtaCities(e.target.value);
	  setIsPopular(false)
    //setValidate(true)
  };

  const handkerClick = (el: string) => {
    setType(el);
  };

  return (
    <label
      className={cn(s.label, {
        error: false,
      })}
    >
		  {text && (
			  <p className={s.label_ttl}>
			  {text}
			  {required && <span className={s.red}>*</span>}
			  {isPassword && (
				<span className={s.right_text}>Забув пароль? {password}</span>
			  )}
			</p>
		  )}
		  <span className={s.search}>
			  <SearchIcon />
		  </span>
      <input
        className={s.input}
        {...input}
        onChange={e => handlerInput(e)}
        type={type}
        value={value}
      />

    </label>
  );
};

export default InputNovaPoshta;
