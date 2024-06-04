import React, { Suspense } from "react";
import { ProfileWrapper } from "./ProfileWrapper";
import { IMainPageProps } from "@/interfaces/page.interface";
import { getDictionary } from "@/libs/18n/getDictionary";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";

export default async function Profile({ params }: IMainPageProps) {
  const dict = await getDictionary(params.lang);

  return (
    <>
      <main className={cn("container", s.wrapper)}>
        <Suspense fallback={null}>
          <ProfileWrapper
            currency={dict.currency}
            profileDict={dict.profile}
            recoveryDict={dict.recoveryPassword}
            checkoutDict={dict.checkout}
            lang={params.lang}
          />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
