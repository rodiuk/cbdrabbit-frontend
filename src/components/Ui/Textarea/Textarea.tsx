import React from 'react';
import s from "./Textarea.module.css";

interface Props {
	placeholder: string
}

const Textarea = ({placeholder}: Props) => {
	return (
		<div className={s.textareaBlock}>
			<p className={s.ttl}>Коментар</p>
			<textarea name="" className={s.textarea} placeholder={placeholder}></textarea>
		</div>
	);
};

export default Textarea;
