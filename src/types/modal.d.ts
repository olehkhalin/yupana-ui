export interface ModalActions {
  isOpen: boolean;
  onRequestClose: () => void;
  onClick?: <T>(arg?: T) => void;
}
export interface ModalInterface extends ModalActions {
  title: string;
  description: string;
  buttonText?: string;
}
