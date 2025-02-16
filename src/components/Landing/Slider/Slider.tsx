import React from 'react';
import s from "./Slider.module.css";
import cn from 'clsx';

interface Props {
  className?: string;
}

export const Slider: React.FC<Props> = ({ className }) => {
  return (
	<div className={cn(s.sliderContainer, className)}>
	  <div className={s.slider}>
        <div className={s.slide}>Слайд 1</div>
        <div className={s.slide}>Слайд 2</div>
        <div className={s.slide}>Слайд 3</div>
        <div className={s.slide}>Слайд 4</div>
      </div>
	</div>
  );
};
