export interface ModalActions {
  title: string
  description: string
  isOpen: boolean
  onRequestClose: () => void
  onClick?: <T>(arg?: T) => void
}
