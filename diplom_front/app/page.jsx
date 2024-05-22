"use client";
import React, { useContext, useEffect, useState } from "react";
import ActiveSlider from "@/components/home/new_clothes_slider";
import ClothesContext from "@/context/clothes_context";
import UserContext from "@/context/user_context";
import HomePageGallery from "@/components/home/home_page_gallery";
import { Fab } from "@mui/material";
import CallToActionn from "../components/home/call_to_action";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ContactModal from "@/components/general/contact_modal";
import CustomLayout from "../components/layouts/my_layout";
import HomeBanner from "@/components/home/home_banner";
import Container from "@/components/general/container";
import { products } from "@/utils/products";
import { truncateText } from "@/utils/truncate_text";
import HomeListClothes from "@/components/home/home_list_clothes";
import GlobalContext from "@/context/global_context";
import CustomCarousel from "@/components/clothes/carousel";
const HomePage = () => {
  const [open, setOpen] = useState(false);
  const clCtx = useContext(ClothesContext);
  const usCtx = useContext(UserContext);
  const glCtx = useContext(GlobalContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    //хуудас зурагдах үед uer, new item, clothes-ийн мэдээллүүдийг татан context-д хадгална.
    init();
  }, []);
  const init = async () => {
    try {

      glCtx.setLoadingReq(true);
      await usCtx.authorization();
      clCtx.loadNewItems();
      clCtx.loadCartItems();
      clCtx.loadCategories();
      clCtx.LoadhomePageClothesInfo();
      usCtx.loadUsers();
      glCtx.setLoadingReq(false);
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };
  return (
    <>
      {usCtx.state.isLogged && usCtx.state.role === "user" ? (
        <div className="flex flex-col items-center w-full mb-2">
          <div className="fixed bottom-20 right-10 z-50 ">
            <Fab
              className="bg-colorpurple"
              size="small"
              color="success"
              aria-label="contact"
              onClick={handleOpen}
            >
              <ConnectWithoutContactIcon />
            </Fab>
          </div>
          <ContactModal handleClose={handleClose} open={open} />
          <div className="w-full mb-6 ">
            <CustomCarousel
              images={[
                "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1619161519929-befcb28d6384?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              ]}
            />
          </div>
          {/* <div className="w-full mb-6 bg-colororange">
            <CallToActionn />
          </div> */}
          {/* <div className="w-full">
            <HomeBanner />
          </div> */}
          <Container>
            <div className="w-full">
              <div className="w-full my-4">
                <p className="w-full text-center font-semibold text-3xl mb-2">
                  Шинээр нэмэгдсэн хувцас
                </p>
                <HomeListClothes
                  bgcolor="bg-white"
                  clothes={clCtx.state.newClothes}
                />
              </div>
              <div className="w-full my-4">
                <p className="w-full text-center font-semibold text-3xl mb-2">
                  Factory new хувцаснууд
                </p>
                <HomeListClothes
                  bgcolor="bg-white"
                  clothes={
                    clCtx.state.homePageClothesInfo?.wellWornOrNewClothes
                  }
                />
              </div>
              <div className="w-full my-4">
                <p className="w-full text-center font-semibold text-3xl mb-2">
                  Хамгийн их үзэлттэй хувцаснууд
                </p>
                <HomeListClothes
                  bgcolor="bg-white"
                  clothes={clCtx.state.homePageClothesInfo?.topReviewedClothes}
                />
              </div>
              <div className="w-full my-4">
                <p className="w-full text-center font-semibold text-3xl mb-2">
                  Хамгийн өндөр үнэлгээтэй хувцаснууд
                </p>
                <HomeListClothes
                  bgcolor="bg-white"
                  clothes={clCtx.state.homePageClothesInfo?.topRatedClothes}
                />
              </div>
              {/* <div className="w-full text-center my-4">
            <p className="mb-4 text-4xl font-bold w-full">
              Шинээр нэмэгдсэн хувцаснууд
            </p>
            <ActiveSlider />
          </div> */}
              {/* <div className="my-4">
            <HomePageGallery title="Bottom" />
          </div>
          <div className="">
            <HomePageGallery title="Bottom" />
          </div> */}
            </div>
          </Container>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default HomePage;
