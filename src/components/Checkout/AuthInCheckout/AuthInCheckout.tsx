"use client";

import React from "react";
import { AuthModalContent } from "./AuthWrapper";
import { Locale } from "../../../../i18n.config";
import Button from "@/components/Ui/Button/Button";
import SimpleModal from "@/components/Ui/SimpleModal/SimpleModal";

import cn from "clsx";
import s from "./AuthInCheckout.module.css";

interface AuthInCheckoutProps {
  lang: Locale;
  dict: any;
}

export const AuthInCheckout = (
  props: AuthInCheckoutProps
): React.JSX.Element => {
  const { lang, dict } = props;
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  return (
    <>
      <div className={cn(s.check_wrapper)}>
        <p className={s.check_label}>{dict.checkout.existedClient}</p>
        <Button
          text={dict.auth.general.signUpProcess}
          handleClick={() => setOpenModal(true)}
        />
        <h2 className={s.divider}>{dict.checkout.divider}</h2>
      </div>

      <SimpleModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={dict.auth.general.signUpProcess}
        children={<AuthModalContent dict={dict} />}
      />
    </>
  );
};
