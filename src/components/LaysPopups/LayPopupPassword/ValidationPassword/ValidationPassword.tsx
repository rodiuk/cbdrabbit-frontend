import React from "react";
import cn from "clsx";

import s from "./ValidationPassword.module.css";
import CheckIcon from "@/components/icons/CheckIcon";
import { CloseRedIcon } from "@/components/icons/CloseRedIcon";

const ValidationPassword = () => {

	
  return (
    <div className={s.texts}>
      <div className="tl">Вимоги до паролю:</div>
      <div className={cn(s.row_line,  {
		[s.green]: true
	  })}>
        <CheckIcon /> Не менше 6 символів
      </div>
		  <div className={cn(s.row_line, {
		  [s.red]: true
	  })}>
        <CloseRedIcon />
        Мінімум 1 буква
      </div>
		  <div className={cn(s.row_line, {
		  [s.black]: true
	  })}>
        <span className={s.round}></span>
        <p>Мінімум 1 цифра</p>
      </div>
    </div>
  );
};

export default ValidationPassword;
