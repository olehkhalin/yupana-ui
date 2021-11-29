export interface ModalActions {
  isOpen: boolean
  onRequestClose: () => void
}

export interface ModalInterface extends ModalActions {
  title: string
  description: string
}
