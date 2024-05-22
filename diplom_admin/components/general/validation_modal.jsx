"use client";
import GlobalContext from "@/context/global_context";
import { Button, Modal } from "flowbite-react";
import { useContext } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const ValidationModal = ({ component, PropsFunction }) => {
  const glCtx = useContext(GlobalContext);
  return (
    <Modal
      className="z-30"
      show={glCtx.openModal}
      size="md"
      onClose={() => {
        PropsFunction && PropsFunction();
        glCtx.setOpenModal(false)
      }}
      popup
    >
      <Modal.Header />
      <Modal.Body>{component}</Modal.Body>
    </Modal>
  );
};

export default ValidationModal;
