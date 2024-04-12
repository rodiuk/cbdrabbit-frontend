
import React from 'react';
import cn from "clsx";

interface InputProps {
	text?: string;
	required?: boolean;
	// Добавьте другие свойства, если необходимо
}
  
const Input: React.FC<InputProps> = ({text, required, ...input}) => {
	// const [value, setValue] = React.useState("")
	
	// const [validate, setValidate] = React.useState(true)

	// const handlerInput = (e: any) => {
	// 	// setValue(e.target.value)
	// 	// setValidate(true)
	// }

	

	return (
		<label className={ cn("label", {
			error: false
		})}>
			<p className="label_ttl">{ text } {required && <span className="red">*</span> }</p>
			<input
				{ ...input }
				//onChange={ (e) => handlerInput(e) }
				
				value="" />
		</label>
	);
};

export default Input;
