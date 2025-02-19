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
const baseDuration = 5; 

export const Slider: React.FC<Props> = ({ className }) => {
	const xValue = useMotionValue(0);
	const handleClick = () => {
		console.log(xValue.get()); // Выводим текущее значение x
	  };
  return (
	  <div className={cn(s.sliderContainer, {
		[s.homeslider]: className === "homeslider",
	})}>
      <motion.div
  className={s.slider}
  animate={{ x: ["0%", "-450%"] }}
  transition={{
    ease: "linear",
    repeat: Infinity,
    duration: baseDuration * (images.length), // Длительность зависит от количества картинок
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
