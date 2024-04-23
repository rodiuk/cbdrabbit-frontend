'use client'
import React from 'react';
import s from "./Textarea.module.css";

interface Props {
	placeholder: string
}

const Textarea = ({ placeholder }: Props) => {
	const [val, setVal] = React.useState("")

	const HendlerInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setVal(e.target.value)
	}
	return (
		<div className={s.textareaBlock}>
			<textarea name="" className={s.textarea} value={val}
				onChange={(e) => HendlerInput(e)}
				placeholder={placeholder}></textarea>
		</div>
	);
};

export default Textarea;
