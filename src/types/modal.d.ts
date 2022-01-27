export interface ModalActions {
  isOpen: boolean;
  onRequestClose: () => void;
  onClick?: <T>(arg?: T) => void;
}
