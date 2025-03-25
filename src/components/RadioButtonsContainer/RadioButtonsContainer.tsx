"use client";
import InputRadio from "@/components/Ui/InputRadio/InputRadio";
import React from "react";

interface Options {
  id: string;
  type: string;
  name: string;
  text: string;
  value: string;
}

interface Props {
  options: Options[];
  handleRadioChange: (id: string) => void;
  deliveryId: string;
}

const RadioButtonsContainer = ({
  options,
  handleRadioChange,
  deliveryId,
}: Props) => {
  const checkedId =
    deliveryId?.length > 1
      ? options.filter(el => el.text === deliveryId)[0]?.id
      : deliveryId;

  return (
    <div>
      <ul>
        {options &&
          options.map((el: Options) => {
            return (
              <li key={el.id}>
                <InputRadio
                  id={el.id}
                  type={el.type}
                  name={el.name}
                  text={el.text}
                  value={el.value}
                  handleRadioChange={handleRadioChange}
                  checkedValue={checkedId}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default RadioButtonsContainer;
