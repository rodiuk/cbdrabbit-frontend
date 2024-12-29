"use client";

import { cartAtom } from "@/libs/store/atoms";
import { useResetAtom } from "jotai/utils";
import React from "react";

export const SuccessClearStorage = () => {
  const resetCart = useResetAtom(cartAtom);

  React.useEffect(() => {
    resetCart();
  }, [resetCart]);

  return <></>;
};
