"use client";
import ClothesListTable from "@/components/clothes/clothes_list_table";
import ClothesContext from "@/context/clothes_context";
import UserContext from "@/context/user_context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSideBar from "@/components/layouts/side_bar";
import CustomLayout from "@/components/layouts/my_layout";
import Container from "@/components/general/container";
import ManageClothesClient from "./manage_clothes_client";
import axios from "axios";
import { getCookie } from "cookies-next";
import NullDataProps from "@/components/clothes/null_data";
import GlobalContext from "@/context/global_context";
export default () => {
  // const products = await
  const [clothes, setClothes] = useState(null);
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

      glCtx.setLoadingReq(false);
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };

  return (
    <>
      {usCtx.state.isLogged && (
        <div className="pt-8">
          <Container>
            <ManageClothesClient clothess={clothes} setClothes={setClothes} />
          </Container>
        </div>
      )}
    </>
  );
};
