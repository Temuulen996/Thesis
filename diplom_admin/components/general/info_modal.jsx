"use client";
import GlobalContext from "@/context/global_context";
import { TrendingUpSharp } from "@mui/icons-material";
import { Button, Modal } from "flowbite-react";
import { useContext } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const InformationModal = ({ Func, component }) => {
  const glCtx = useContext(GlobalContext);
  return (
    <Modal
      className="z-30 fixed h-screen w-screen top-0 left-0"
      show={false}
      size="md"
      onClose={() => glCtx.setOpenModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Бүтээгдэхүүнийг шинээр нэмэх үү?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={async () => {
                glCtx.setOpenModal(false);
                await func();
              }}
            >
              {"Тийм"}
            </Button>
            <Button color="gray" onClick={() => glCtx.setOpenModal(false)}>
              Үгүй
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InformationModal;
