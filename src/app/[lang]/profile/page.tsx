"use client";

import React from "react";

import cn from "clsx";
import s from "./page.module.css";

import { ArrowDownIcon } from "@/components/icons/ArrowDown";

import ProfileDetail from "./ProfileDetail/ProfileDetail";
import PencilIcon from "@/components/icons/PencilIcon";
import NovaPoshta from "@/components/NovaPoshta/NovaPoshta";


import Image from "next/image";
import InputsBlockTelNameThirname from "@/components/InputsBlockTelNameThirname/InputsBlockTelNameThirname";
import Button from "@/components/Ui/Button/Button";
import useMedia from "@/hooks/useMedia";
import ProfileTablet from "./ProfileTablet";
import ProfileNoTablet from "./ProfileNoTablet";

export default function Profile() {
	const isTablet = useMedia(993);
  return (
	  <main className={cn("container", s.wrapper)}>
		  {isTablet ? (
			  <ProfileTablet />
		  ) : (
				  <ProfileNoTablet />
		  )}
      
    </main>
  );
}
