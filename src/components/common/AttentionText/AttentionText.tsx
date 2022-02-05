import React, { useState, useCallback, FC } from "react";
import cx from "classnames";

import { ModalProps } from "types/modal";
import { Button } from "components/ui/Button";
import { InformationModal } from "components/modals/InformationModal";
import { ReactComponent as Attention } from "svg/Attention.svg";

import s from "./AttentionText.module.sass";

export type ModalContent = Pick<
  ModalProps,
  "title" | "description" | "buttonText"
>;

export type AttentionTextProps = {
  text: string;
  theme: keyof typeof themeClasses;
  className?: string;
} & ModalContent;

export const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const AttentionText: FC<AttentionTextProps> = ({
  text,
  title,
  description,
  buttonText,
  theme = "primary",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      {text}
      <Button theme="clear" onClick={handleModal} className={s.attention}>
        <Attention className={s.attentionIcon} />
      </Button>
      <InformationModal
        title={title}
        description={description}
        buttonText={buttonText}
        isOpen={isOpen}
        onRequestClose={handleModal}
        onClick={handleModal}
      />
    </div>
  );
};
