"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import UserContext from "@/context/user_context";
import { Badge, IconButton, SwipeableDrawer } from "@mui/material";
import ShoppingCart from "./shopping_cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { usePathname } from "next/navigation";
import ClothesContext from "@/context/clothes_context";
const Header = () => {
  const [IsShoppingCartOpen, setIsShoppingCartOpen] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const usCtx = useContext(UserContext);
  const clCtx = useContext(ClothesContext);
  const pathname = usePathname();
  const ShoppingCardSideBar = (anchor) => (
    <Box
      className=" z-50"
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : "100%",
        zIndex: 10,
      }}
      role="presentation"
    >
      {/* <div
        onClick={toggleShoppingCard(anchor, false)}
        className="w-screen h-screen  z-30"
      ></div> */}
      <ShoppingCart />
    </Box>
  );
  const toggleShoppingCard = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsShoppingCartOpen({ ...IsShoppingCartOpen, [anchor]: open });
  };
  return (
    <div className="sticky top-0 z-[1000]">
      {usCtx.state.appBar ? (
        <header className="bg-slate-700 py-2 border-b">
          <div className="relative md:w-1/3 lg:w-1/4 ">
            <SwipeableDrawer
              anchor={"right"}
              open={IsShoppingCartOpen["right"]}
              onClose={toggleShoppingCard("right", false)}
              onOpen={toggleShoppingCard("right", true)}
            >
              {ShoppingCardSideBar("left")}
            </SwipeableDrawer>
          </div>
          <Navbar className="bg-slate-700 " fluid rounded>
            <Navbar.Brand href="/">
              <img
                src="https://play-lh.googleusercontent.com/A22g2UL_Qfsc7Y_wCEB5dsC2ZMy6CahngFySoE36SWYDyMhUqfzOjX2iZ9u8JvzR4THu=w240-h480-rw"
                className="mr-3 h-6 sm:h-9"
                alt="Ethrift Logo"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-white">
                EThrift admin
              </span>
            </Navbar.Brand>
            <div className="flex md:order-2 items-center">
              {/* <Link href="/cart"> */}
              <div className="flex justify-center items-center mr-4">
                {" "}
                <Link href="/depart_locations">
                  <IconButton
                    onClick={() => {}}
                    aria-label="add to shopping cart"
                    className="hover:bg-gray-200 "
                  >
                    <MyLocationIcon className="fill-colororange" />
                  </IconButton>
                </Link>
              </div>

              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    {usCtx.state.userDetail?.fname}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {usCtx.state.userDetail?.email}
                  </span>
                </Dropdown.Header>

                <Dropdown.Divider />
                {usCtx.state.role != "admin" && (
                  <Dropdown.Item>
                    <Link href="/profile">
                      <div className="w-full h-full">Profile </div>
                    </Link>
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  onClick={() => {
                    usCtx.logOut();
                  }}
                >
                  Sign out
                </Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle />
            </div>
          </Navbar>
        </header>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
