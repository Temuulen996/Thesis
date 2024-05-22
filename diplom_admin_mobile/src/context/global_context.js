"use client";
const { createContext, useState } = require("react");

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoadingReq, setLoadingReq] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        isLoadingReq,
        setLoadingReq,
        successModal,
        setSuccessModal,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;
