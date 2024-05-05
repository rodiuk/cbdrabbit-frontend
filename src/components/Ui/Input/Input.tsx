"use client";

import React from "react";
import EyeClosed from "@/components/icons/EyeClosed";
import EyeOpened from "@/components/icons/EyeOpened";

import cn from "clsx";
import s from "./s.module.css";

interface InputProps {
  text?: string;
  required?: boolean;
  type?: string;
  name?: string;
  placeholder?: string;
  password?: boolean;
  isPassword?: boolean;
  value?: string;
  autoComplete?: string;
  onInputChange?: (value: string) => void;
  showLay?: any;
  handleForgot?: () => void;
  errorText?: string;
  showForgotPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  text,
  required,
  password,
  isPassword,
  value,
  onInputChange,
  showLay,
  errorText,
  showForgotPassword,
  handleForgot,
  ...input
}) => {
  const [type, setType] = React.useState(input.type);

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onInputChange) onInputChange(e.target.value);
  };

  const handlerClick = (el: string) => {
    setType(el);
  };

  return (
    <label
      className={cn(s.label, {
        error: false,
      })}
    >
      <div className={s.label_ttl}>
        {text}
        {required && <span className={s.red}>*</span>}
        {showForgotPassword && (
          <span className={s.right_text} onClick={handleForgot}>
            Забув пароль? {password}
          </span>
        )}
      </div>

      {isPassword && (
        <div className={s.forEyePosition}>
          <>
            {type === "text" ? (
              <div className={s.pass} onClick={() => handlerClick("password")}>
                <EyeClosed />
              </div>
            ) : (
              <div className={s.pass} onClick={() => handlerClick("text")}>
                <EyeOpened />
              </div>
            )}
          </>
        </div>
      )}

      <input
        className={s.input}
        {...input}
        onChange={e => handlerInput(e)}
        type={type}
        value={value}
        onClick={showLay ? () => showLay() : undefined}
      />

      {errorText && <p className={s.error}>Не правильно введений пароль</p>}
    </label>
  );
};

export default Input;
