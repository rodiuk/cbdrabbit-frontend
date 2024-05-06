"use client";
import React from "react";
import cn from "clsx";
import s from "./s.module.css";
import { SearchIcon } from "@/components/icons/SearchIcon";

interface InputProps {
  text?: string;
  required?: boolean;
  type?: string;
  name?: string;
  target: string;
  placeholder?: string;
  password?: boolean;
  isPassword?: boolean;
  novaposhtaCities?: any;
  setIsPopular?: any;
  newPostNum?: any;
  errorRes?: any;
}

const InputNovaPoshta: React.FC<InputProps> = ({
  text,
  required,
  password,
  isPassword,
  novaposhtaCities,
  setIsPopular,
  newPostNum,
  errorRes,
  target,
  ...input
}) => {
  const [value, setValue] = React.useState("");
  const [type, setType] = React.useState(input.type);

  // const [validate, setValidate] = React.useState(true)
  const handlerInput = (e: any) => {
    if (target === "cityInput") {
      setValue(e.target.value);
      novaposhtaCities(e.target.value);
      setIsPopular(false);
    } else if (target === "filialInput") {
      setValue(e.target.value);
      newPostNum(e.target.value);
      errorRes();
    }

    //setValidate(true)
  };

  const handlerClick = (el: string) => {};

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
        </p>
      )}
      <span className={s.search}>
        <SearchIcon />
      </span>
      <input
        className={s.input}
        {...input}
        onChange={e => handlerInput(e)}
        onClick={() => handlerClick(target)}
        type={type}
        value={value}
      />
    </label>
  );
};

export default InputNovaPoshta;
