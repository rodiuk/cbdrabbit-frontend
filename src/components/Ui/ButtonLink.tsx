"use client";

import React from "react";
import Button from "./Button/Button";
import { useRouter } from "next/navigation";

interface Props {
  href: string;
  text: string;
}

export const ButtonLink = ({ href, text }: Props): React.JSX.Element => {
  const router = useRouter();

  return <Button text={text} handleClick={() => router.push(href)} />;
};
