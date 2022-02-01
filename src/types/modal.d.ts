export type ModalActions = {
  isOpen: boolean;
  onRequestClose: () => void;
  onClick?: <T>(arg?: T) => void;
};

export type ModalProps = {
  title: string;
  description: string;
  buttonText?: string;
} & ModalActions;
