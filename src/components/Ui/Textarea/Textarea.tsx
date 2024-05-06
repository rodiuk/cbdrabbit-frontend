import React from "react";

import s from "./Textarea.module.css";

interface Props {
  placeholder: string;
  value: string;
  setValue: (val: string) => void;
}

const Textarea = ({ placeholder, value, setValue }: Props) => {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className={s.textareaBlock}>
      <textarea
        name=""
        className={s.textarea}
        value={value}
        onChange={e => handleInput(e)}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default Textarea;
