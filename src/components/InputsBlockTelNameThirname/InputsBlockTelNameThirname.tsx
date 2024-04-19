import React from 'react';
import s from "./InputsBlockTelNameThirname.module.css";
import Input from '../Ui/Input/Input';

const InputsBlockTelNameThirname = () => {
	return (
		<div className={s.labels}>
            <Input
              type="text"
              name="Телефон"
              text="Телефон"
              required={true}
              placeholder="+380 (__)___-__-__"
            />
            <Input
              type="text"
              name="Прізвище"
              text="Прізвище"
              required={true}
              placeholder="Введи прізвище кирилицею"
            />
            <Input
              type="text"
              name="Імʼя"
              text="Імʼя"
              required={true}
              placeholder="Введи імʼя кирилицею"
            />
          </div>
	);
};

export default InputsBlockTelNameThirname;
