'use client'
import React from "react";
import s from "./Slider.module.css";
import cn from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/img/s1.png",
  "/img/s2.png",
  "/img/s3.png",
  "/img/s4.png",
  "/img/s5.png",
  "/img/s6.png",
  "/img/s7.png",
  "/img/s8.png",
];

interface Props {
  className?: string;
}

export const Slider: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(s.sliderContainer, className)}>
      <motion.div
        className={s.slider}
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      >
        {[...images, ...images].map((src, index) => (
          <div className={s.slide} key={index}>
            <Image src={src} alt="baban" width={200} height={150} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
