import { useState, createContext } from "react";
import Modal from "../components/Modal";

type IProps = {
  children: React.ReactElement;
};

type IModalContext = {
  isOpen: boolean;
  openModal: (modalContent: React.ReactElement) => void;
  closeModal: () => void;
};

const initialModalContext: IModalContext = {
  isOpen: false,
  openModal: () => null,
  closeModal: () => null,
};

export const ModalContext = createContext(initialModalContext);

export default function ModalProvider({ children }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [renderComponent, setRenderComponent] = useState<React.ReactElement>();

  const openModal = (modalContent: React.ReactElement) => {
    setIsModalOpen(true);
    setRenderComponent(modalContent);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen: isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {isModalOpen && <Modal content={renderComponent} />}
      {children}
    </ModalContext.Provider>
  );
}
