"use client";
import GlobalContext from "@/context/global_context";
import { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
const GlobalLoader = () => {
  const glCtx = useContext(GlobalContext);

  return (
    <>
      <Backdrop
        className="z-[100000]"
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={glCtx.isLoadingReq}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default GlobalLoader;