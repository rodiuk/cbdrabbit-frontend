"use client";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import cn from "clsx";
import "@splidejs/react-splide/css";
import Image from "next/image";
import s from "./SplideSlider.module.css";

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

export const SplideSlider: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(s.sliserCont, {
        [s.homeslider]: className === "homeslider",
      })}
    >
      <Splide
        aria-label="My Favorite Images"
        options={{
          type: "loop",
          drag: "free",
          focus: "center",
          perPage: 7,
          arrows: false,
          pagination: false,
          autoScroll: {
            speed: 1,
          },
          breakpoints: {
            1440: { perPage: 6 },
            1200: { perPage: 5 },
            1100: { perPage: 4 },
            768: { perPage: 3 },
            640: { perPage: 2 },
            580: { perPage: 2 },
          },
        }}
        extensions={{ AutoScroll }}
      >
        {images.map((src, index) => (
          <SplideSlide key={index}>
            <div className={s.slide}>
              <Image src={src} alt="slide" width={200} height={150} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
