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
	validateData?: any,
	
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
  ...input
}) => {
	const [type, setType] = React.useState(input.type);
	const [isEmpty, setIsEmpty] = React.useState(false)

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
	  if (onInputChange) onInputChange(e.target.value);
	  setIsEmpty(false)
  };

  const handlerClick = (el: string) => {
    setType(el);
	};

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
        type={type}
        value={value}
        onClick={showLay ? () => showLay() : undefined}
        className={s.input}
        {...input}
      />

		  {errorText && <p className={s.error}>{errorText }</p>}
    </label>
  );
};

export default Input;
