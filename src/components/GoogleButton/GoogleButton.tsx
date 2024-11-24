"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "../icons/Google";

import styles from "./GoogleButton.module.css";

interface Props {
  label: string;
  externalPath?: string;
}

export const GoogleButton = ({
  label,
  externalPath,
}: Props): React.JSX.Element => {
  return (
    <button
      type="button"
      aria-label={label}
      className={styles.container}
      onClick={() =>
        signIn("google", {
          redirect: true,
          callbackUrl: externalPath ? externalPath : "/profile",
        })
      }
    >
      <GoogleIcon />
      {label}
    </button>
  );
};
