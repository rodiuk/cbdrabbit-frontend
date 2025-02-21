import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import cn from 'clsx';
import '@splidejs/react-splide/css';
interface Props {
  className?: string;
}

export const SplideSlider: React.FC<Props> = ({ className }) => {
  return (
	<div className={cn('', className)}>
	  <Splide aria-label="My Favorite Images">
  <SplideSlide>
    <img src="image1.jpg" alt="Image 1"/>
  </SplideSlide>
  <SplideSlide>
    <img src="image2.jpg" alt="Image 2"/>
  </SplideSlide>
</Splide>
	</div>
  );
};
