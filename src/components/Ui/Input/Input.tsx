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
	validateData?: any;
	readOnly?: boolean
	textOnTheRight?: string
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
	validateData,
	readOnly,
	textOnTheRight,
  ...input
}) => {
	const [type, setType] = React.useState(input.type);
	const [isEmpty, setIsEmpty] = React.useState(false)

	const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		if (name === "phone") {
			const numericValue = value.replace(/(?!^[\d+])\D/g, '');
			if (numericValue !== value) {
				e.target.value = numericValue;
				return;
			  }
		}
		/* хз. поки що буде хай щоб знов не перероблювати як передумають)  if (name === "email") {
			console.log(5)
			const emailValue = value.replace(/[А-Яа-яЁё]/g, '');
			console.log(emailValue, value)
			if (emailValue !== value) {
				console.log(1)
				e.target.value = emailValue;
				return;
			  }
	  } */
	  if (onInputChange) onInputChange(value);
		setIsEmpty(false)
  };

  const handlerClick = (el: string) => {
    setType(el);
	console.log(type)
	};

	const handlerBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		if (name === "email") {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			if (!emailRegex.test(value)) {
				//console.log("Invalid email format");
				setIsEmpty(true)
			  return;
			}
		  }
	}

	React.useEffect(() => {
		setIsEmpty(false)
		validateData && validateData.map((elem: any) => {
			if (elem.name === input.name) {
				if (elem.value) {
					setIsEmpty(true)
				}
			}
		})
	}, [validateData])


  return (
    <label
      className={cn(s.label, {
		  error: false,
		  [s.isEmpty]: isEmpty
      })}
	  >
		  {text && (
			  <div className={s.label_ttl}>
			  {text}
			  {required && <span className={s.red}>*</span>}
			  {showForgotPassword && (
				<span className={s.right_text} onClick={handleForgot}>
				  Забув пароль? {password}
				</span>
				  )}
				  {textOnTheRight && (
				<span className={s.right_text}>
				  {textOnTheRight}
				</span>
			  )}
			</div>
		  )}


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
        onChange={e => handlerInput(e)}
        onBlur={e => handlerBlur(e)}
        value={value}
        onClick={showLay ? () => showLay() : undefined}
        className={s.input}
			  {...input}
			  readOnly={readOnly}
			  type={type || input.type}
      /> 

		  {errorText && <p className={s.error}>{errorText }</p>}
    </label>
  );
};

export default Input;
