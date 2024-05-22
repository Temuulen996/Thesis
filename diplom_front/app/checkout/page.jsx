"use client";
import CustomLayout from "@/components/layouts/my_layout";
import ClothesContext from "@/context/clothes_context";
import UserContext from "@/context/user_context";
import { useContext, useEffect, useState } from "react";

import CheckoutForm from "./checkout_form";
import CheckoutClient from "./checkout_client";
import PageLoader from "@/components/general/loader_page";
import EPageBanner from "@/components/general/page_banner";

export default () => {
  const [clientSecret, setClientSecret] = useState("jhk");
  const clCtx = useContext(ClothesContext);
  const usCtx = useContext(UserContext);

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    await usCtx.authorization();
    await clCtx.loadCartItems();
    await usCtx.loadLoggedUser();
  }
  if (!clCtx.state.cartItems) return <PageLoader />;
  return (
    <>
      {clCtx.state.cartItems.lenght != 0 && clientSecret && (
        <div className="w-full flex-col justify-normal">
          <CheckoutClient userInfo={usCtx.state.userDetail} />
        </div>
      )}
    </>
  );
};
