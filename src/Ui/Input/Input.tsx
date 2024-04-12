
import React from 'react';
import cn from "clsx";
import s from "./s.module.css";

interface InputProps {
	text?: string;
	required?: boolean;
	type?: string
	placeholder?: string
	password?: boolean
	isPassword?: boolean
	// Добавьте другие свойства, если необходимо
}
  
const Input: React.FC<InputProps> = ({text, required, password, isPassword, ...input}) => {
	// const [value, setValue] = React.useState("")
	
	// const [validate, setValidate] = React.useState(true)

	// const handlerInput = (e: any) => {
	// 	// setValue(e.target.value)
	// 	// setValidate(true)
	// }

	

	return (
		<label className={ cn(s.label, {
			error: false
		})}>
			<p className={s.label_ttl}>{text}
				{required && <span className="red">*</span>}
				{isPassword && <span className={s.right_text}>Забув пароль?</span>}
			</p>
			<input className={s.input}
				{ ...input }
				//onChange={ (e) => handlerInput(e) }
				
				value="" />
			{password && (
				<div className={s.pass}><svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
			  >
				<g clipPath="url(#clip0_1_1323)">
				  <path
					d="M14.86 14.86C13.4614 15.9261 11.7584 16.5167 10 16.5455C4.27273 16.5455 1 10 1 10C2.01773 8.10337 3.42929 6.44631 5.14 5.14M8.28182 3.65091C8.845 3.51908 9.4216 3.45319 10 3.45455C15.7273 3.45455 19 10 19 10C18.5033 10.9291 17.911 11.8039 17.2327 12.61M11.7345 11.7345C11.5098 11.9757 11.2389 12.1691 10.9378 12.3033C10.6367 12.4374 10.3116 12.5096 9.98207 12.5154C9.6525 12.5212 9.32513 12.4606 9.0195 12.3371C8.71387 12.2137 8.43623 12.0299 8.20315 11.7969C7.97007 11.5638 7.78632 11.2861 7.66287 10.9805C7.53942 10.6749 7.47879 10.3475 7.48461 10.0179C7.49042 9.68835 7.56256 9.36333 7.69672 9.06224C7.83087 8.76115 8.0243 8.49017 8.26545 8.26545M1 1L19 19"
					stroke="#98979A"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				  />
				</g>
				<defs>
				  <clipPath id="clip0_1_1323">
					<rect width="20" height="20" fill="white" />
				  </clipPath>
				</defs>
			  </svg></div>
			)}
			
		</label>
	);
};

export default Input;
