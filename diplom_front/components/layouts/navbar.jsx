"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import UserContext from "@/context/user_context";
import { Badge, IconButton, SwipeableDrawer } from "@mui/material";
import ShoppingCart from "./shopping_cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { usePathname } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClothesContext from "@/context/clothes_context";
import ehtiftIcon from "../../public/images/ehtift_icon.png";
import Image from "next/image";
import NavbarItem from "./navbar_item";
import LogoutIcon from "@mui/icons-material/Logout";
import { io } from "socket.io-client";
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
  // const socket = io(process.env.API_URL);
  // useEffect(() => {
  //   console.log(usCtx.state.userDetail?._id);
  //   socket.emit("joinNotificationRoom", usCtx.state.userDetail?._id);
  //   socket.on('newNotification', (notification) => {
  //     console.log("🚀 ~ socket.on ~ notification:", notification);
  //   });
  // }, []);
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
              <Image
                width={500}
                height={500}
                objectFit
                src="/images/ehtift_icon.png"
                className="mr-3  h-10 w-10 sm:h-9"
                alt="Ethrift Logo"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-white">
                EThrift
              </span>
            </Navbar.Brand>
            <div className="flex md:order-2 items-center">
              {/* <Link href="/cart"> */}
              <div className="flex justify-center items-center mr-4">
                <Link href="/depart_locations">
                  <IconButton
                    onClick={() => { }}
                    aria-label="add to shopping cart"
                    className="hover:bg-gray-500 "
                  >
                    <MyLocationIcon className="fill-white" />
                  </IconButton>
                </Link>
                <Badge badgeContent={clCtx.state.cartTotal} color="secondary">
                  <IconButton
                    onClick={toggleShoppingCard("right", true)}
                    aria-label="add to shopping cart"
                    className="hover:bg-gray-500 "
                    alt="loaction"
                  >
                    <ShoppingCartIcon className="fill-white" />
                  </IconButton>
                </Badge>
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
                    <div className=" flex gap-2 items-center flex-row justify-between w-full">
                      <Link href="/profile">
                        <div>Хэрэглэгч</div>
                      </Link>
                      <AccountCircleIcon />
                    </div>
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  onClick={() => {
                    usCtx.logOut();
                  }}
                >
                  <div className=" flex gap-2 items-center flex-row justify-between">
                    <div>Системээс гарах</div> <LogoutIcon />
                  </div>
                </Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
              <>
                <NavbarItem href="/" label="Нүүр" selected={pathname === "/"} />

                <NavbarItem
                  href="/shop?all=true"
                  label="Дэлгүүр"
                  selected={pathname === "/shop"}
                />

                <NavbarItem
                  href="/about_us"
                  label="Бидний тухай"
                  selected={pathname === "/about_us"}
                />
              </>

              {usCtx.state.role === "admin" && (
                <Link href="/admin">
                  <div
                    className={`${pathname === "/admin" ? "text-white" : "text-slate-300"
                      } hover:text-slate-200`}
                  >
                    Админ
                  </div>
                </Link>
              )}
            </Navbar.Collapse>
          </Navbar>
        </header>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
