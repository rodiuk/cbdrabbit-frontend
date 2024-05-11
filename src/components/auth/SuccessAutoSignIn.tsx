"use client";

import React from "react";
import { IUser } from "@/interfaces/user.interface";
import { signIn } from "next-auth/react";

interface Props {
  user: IUser;
}

export const SuccessAutoSignIn = ({ user }: Props): React.JSX.Element => {
  React.useEffect(() => {
    if (!user?.id || typeof window === "undefined") return;

    (async function fetch() {
      await signIn("autoSignIn", {
        redirect: false,
        userId: user.id,
      });
    })();
  }, [user?.id]);

  return <></>;
};
