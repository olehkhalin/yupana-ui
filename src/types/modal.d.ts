import { ReactNode } from "react";

export type ModalActions = {
  isOpen: boolean;
  onRequestClose: () => void;
  onClick?: <T>(arg?: T) => void;
};

export type ModalProps = {
  title: string;
  description: ReactNode;
  buttonText?: string;
} & ModalActions;
