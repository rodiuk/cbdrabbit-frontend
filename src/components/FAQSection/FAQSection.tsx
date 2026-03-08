"use client";

import React from "react";
import styles from "./FAQSection.module.css";
import { FaqItem } from "@/interfaces/locales.interface";

interface FaqSectionProps {
  faqs: FaqItem[];
}

export const FaqSection = ({ faqs }: FaqSectionProps) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className={styles.wrapper}>
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className={styles.item}>
            <button className={styles.question} onClick={() => toggle(index)}>
              {item.question}

              <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
                ▾
              </span>
            </button>

            {isOpen && (
              <div
                className={styles.answer}
                dangerouslySetInnerHTML={{
                  __html: item?.answer,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
