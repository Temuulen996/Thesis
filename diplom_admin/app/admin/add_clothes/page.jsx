"use client";

import ClothesContext from "@/context/clothes_context";
import UserContext from "@/context/user_context";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSideBar from "@/components/layouts/side_bar";
import AddClothes from "@/app/admin/add_clothes/add_clothes";
import CustomLayout from "@/components/layouts/my_layout";
import Container from "@/components/general/container";
import NullDataProps from "@/components/clothes/null_data";
import GlobalContext from "@/context/global_context";

export default () => {
  const clCtx = useContext(ClothesContext);
  const usCtx = useContext(UserContext);
  const glCtx = useContext(GlobalContext);
  const router = useRouter();
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    glCtx.setLoadingReq(true);
    try {
      await usCtx.authorization();
      clCtx.loadCategories();
      clCtx.loadClothes();
      glCtx.setLoadingReq(false);
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };

  return (
    <>
      {usCtx.state.isLogged && (
        <div className="p-8">
          <Container>
            <AddClothes />
          </Container>
        </div>
      )}
    </>
  );
};
