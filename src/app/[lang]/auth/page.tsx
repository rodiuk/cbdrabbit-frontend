import React from "react";
import { SignInEmailForm } from "@/components/forms/auth/SignInEmailForm";
import { IMainPageProps } from "@/interfaces/page.interface";

import cn from "clsx";
import styles from "./page.module.css";

export default function About({ params }: IMainPageProps) {
  return (
    <main className={cn("container", styles.main)}>
      <SignInEmailForm lang={params.lang} />
    </main>
  );
}
