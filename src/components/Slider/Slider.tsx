"use client";

import React from "react";
import { motion, useMotionValue } from "framer-motion";
import cn from "clsx";
import Image from "next/image";
import s from "./Slider.module.css";

const images = [
  "/img/s1.png",
  "/img/s2.png",
  "/img/s3.png",
  "/img/s4.png",
  "/img/s5.png",
  "/img/s6.png",
  "/img/s7.png",
  "/img/s8.png",
	"/img/s9.png",
  "/img/s10.png",
  "/img/s11.png",
  "/img/s12.png",
  "/img/s13.png",
  "/img/s14.png",
  "/img/s15.png",
  "/img/s16.png",
  "/img/s17.png",
  "/img/s18.png",
	"/img/s19.png",
  "/img/s20.png",
  "/img/s21.png",
  "/img/s22.png",
  "/img/s23.png",
  "/img/s24.png",
  "/img/s25.png",
];

interface Props {
  className?: string;
}
const imageCount = images.length;


export const Slider: React.FC<Props> = ({ className }) => {
	const [sizeWindow, setSizeWindow] = React.useState<number | null>(null);
	const [baseDuration, setBaseDuration] = React.useState(100); 
	const xValue = useMotionValue(0);
	const handleClick = () => {
		console.log(xValue.get()); // Выводим текущее значение x
	};
	React.useEffect(() => {
		if (typeof window !== "undefined") { // Проверка, что код выполняется в браузере
		  setSizeWindow(window.innerWidth);
	  
		  const handleResize = () => {
			setSizeWindow(window.innerWidth);
		  };
	  console.log(sizeWindow)
		  window.addEventListener("resize", handleResize);
	  
		  return () => window.removeEventListener("resize", handleResize);
		}
	}, []);

	React.useEffect(() => {
		console.log(sizeWindow);
		
		if (sizeWindow !== null && sizeWindow <= 580) {
			setBaseDuration(25)
		} else {
			setBaseDuration(100)
		}
	  }, [sizeWindow]);
	  
	
  return (
	  <div className={cn(s.sliderContainer, {
		[s.homeslider]: className === "homeslider",
	})}>
		  <motion.div
			  key={baseDuration}
  className={s.slider}
  animate={{ x: ["0%", "-450%"] }}
  transition={{
    ease: "linear",
    repeat: Infinity,
    duration: baseDuration , // Длительность зависит от количества картинок
			  }}
			//   onUpdate={() => {
			// 	// Обновление значения xValue с каждым кадром
			// 	console.log(xValue.get()); // Печатаем текущее значение
			//   }}
			  style={{ x: xValue }}
        onClick={handleClick}
>
        {[...images, ...images, ...images, ...images].map((src, index) => (
			<div className={s.slide} key={index}>
            <Image src={src} alt="slide" width={200} height={150} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
