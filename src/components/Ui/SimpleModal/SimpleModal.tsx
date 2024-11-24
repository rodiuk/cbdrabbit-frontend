import React from "react";
import Close from "@/components/icons/Close";

import cn from "clsx";
import s from "./SimpleModal.module.css";

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SimpleModal = ({
  isOpen,
  onClose,
  title,
  children,
}: SimpleModalProps): React.JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <div className={cn(s.modal_overlay)} onClick={onClose}>
      <div className={s.modal_overlay_bg} />

      <div className={cn(s.modal_content)} onClick={e => e.stopPropagation()}>
        <div className={cn(s.modal_header)}>
          <h2>{title}</h2>
          <button className={cn(s.close_button)} onClick={onClose}>
            <Close />
          </button>
        </div>
        <div className={cn(s.modal_body)}>{children}</div>
      </div>
    </div>
  );
};

export default SimpleModal;
