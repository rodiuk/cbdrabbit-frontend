"use client";

import React from "react";
import { Locale } from "../../../../../i18n.config";
import { HomeLogo } from "./HomeLogo";

interface Props {
  lang: Locale;
}

export const LogoContainer = ({ lang }: Props): React.JSX.Element => {
 

  return (
    <>
	  <HomeLogo lang={lang} />
    </>
  );
};
