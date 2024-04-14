'use client'
import React from "react";
import useMedia from "@/hooks/useMedia";

import cn from "clsx";
import styles from "./page.module.css";

import pic1 from "/public/img/pic1.jpg";
import np from "/public/img/np.svg";
import money from "/public/img/money.svg";


import Input from "@/Ui/Input/Input";
import InputRadio from "@/Ui/InputRadio/InputRadio";
import RadioButtonsContainer from "@/components/RadioButtonsContainer/RadioButtonsContainer";
import InputNovaPoshta from "@/Ui/InputNovaPoshta/InputNovaPoshta";
import CheckoutRes from "./CheckoutRes/CheckoutRes";
import Tablet from "./Tablet";
import NoTablet from "./NoTablet";

export default function Checkout() {
	const isTablet = useMedia(769)
	
  return (
    <main className={cn("container", styles.main)}>
      <div className={styles.checoutPage}>
			  <div className={styles.checkoutBlocks}>
				  {isTablet ? (
					  <Tablet />
				  ): (
					<NoTablet />	  
				  )}
			
        </div>
		  </div>
		
    </main>
  );
}
