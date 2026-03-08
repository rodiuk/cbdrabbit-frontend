"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "../icons/Google";

import cn from "clsx";
import styles from "./GoogleButton.module.css";

interface Props {
  label: string;
  externalPath?: string;
  className?: string;
}

const GoogleButton = ({
  label,
  externalPath,
  className,
}: Props): React.JSX.Element => {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(styles.container, className)}
      onClick={() =>
        signIn("google", {
          redirect: true,
          callbackUrl: !!externalPath ? externalPath : "/profile",
        })
      }
    >
      <GoogleIcon />
      {label}
    </button>
  );
};

export default GoogleButton;
