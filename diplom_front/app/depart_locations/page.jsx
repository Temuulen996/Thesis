"use client";
import CustomLayout from "@/components/layouts/my_layout";
import ClothesContext from "@/context/clothes_context";
import GlobalContext from "@/context/global_context";
import UserContext from "@/context/user_context";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
const LocationMap = dynamic(() => import("../../components/map"), {
  ssr: false,
});

export default () => {
  const clCtx = useContext(ClothesContext);
  const usCtx = useContext(UserContext);
  const glCtx = useContext(GlobalContext);
  useEffect(() => {
    init();

  }, []);
  const init = async () => {
    try {
      glCtx.setLoadingReq(true);
      await usCtx.authorization();
      // await clCtx.loadClothes();

      glCtx.setLoadingReq(false);
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };
  return (
    <div className="w-full h-full">
      <LocationMap />
    </div>
  );
};
