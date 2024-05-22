"use client";
import GlobalContext from "@/context/global_context";
import { Button, Modal } from "antd";
import Image from "next/image";
import { useContext } from "react";

const ESuccessModal = ({ component }) => {
    const glCtx = useContext(GlobalContext);
    return (

        <Modal
            open={glCtx.successModal}
            title="Амжилттай"
            footer={null}
        >
            <Image
                src="/gif/success.gif"
                width={500}
                height={500} />
        </Modal>
    );
}

export default ESuccessModal;