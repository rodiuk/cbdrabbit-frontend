"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "../icons/Google";

import styles from "./GoogleButton.module.css";

interface Props {
  label: string;
  externalPath?: string;
}

const GoogleButton = ({ label, externalPath }: Props): React.JSX.Element => {
  return (
    <button
      type="button"
      aria-label={label}
      className={styles.container}
      onClick={async () =>
        await signIn("google", {
          redirect: true,
          callbackUrl:
            externalPath && externalPath?.length > 0
              ? externalPath
              : "/profile",
        })
      }
    >
      <GoogleIcon />
      {label}
    </button>
  );
};

export default GoogleButton;
