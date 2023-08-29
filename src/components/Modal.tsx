import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

type IProps = {
  content: React.ReactElement | undefined;
};

const Modal = ({ content }: IProps) => {
  const modalContext = useContext(ModalContext);

  return (
    <div className="fixed flex justify-center items-center w-screen h-screen backdrop-blue-sm bg-black bg-opacity-50 ">
      <div className="bg-white w-[600px] h-[400px]">
        <div>Modal Title</div>
        {content}
        <div>
          <button onClick={modalContext.closeModal}>Close Modal</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
