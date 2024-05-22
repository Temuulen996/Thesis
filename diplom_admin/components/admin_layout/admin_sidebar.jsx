"use client";
import List from "@mui/material/List";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import AdminSideBarItem from "./admin_sidebar_item";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { usePathname } from "next/navigation";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Link from "next/link";
import { Button } from "@mui/material";
import UserContext from "@/context/user_context";
import { useContext } from "react";
const AdminSideBar = () => {
  const usCtx = useContext(UserContext);
  const pathname = usePathname();
  return (
    <>
      {usCtx.state.isLogged && (
        <aside className="h-screen bg-slate-700 text-white w-full sticky top-0 left-0 overflow-auto flex flex-col justify-between">
          <div>
            <List component="nav" aria-label="main mailbox folders">
              <Link href="/admin">
                <AdminSideBarItem
                  label="Үзүүлэлт"
                  icon={<DashboardIcon color="white" className="fill-white" />}
                  selected={pathname === "/admin"}
                />
              </Link>
              <Link href="/admin/user_list">
                <AdminSideBarItem
                  label="Хэрэглэгч"
                  icon={<PeopleAltOutlinedIcon className="fill-white" />}
                  selected={pathname === "/admin/user_list"}
                />
              </Link>
              <Link href="/admin/clothes_list">
                <AdminSideBarItem
                  label="Хувцас"
                  icon={<CheckroomOutlinedIcon className="fill-white" />}
                  selected={pathname === "/admin/clothes_list"}
                />
              </Link>
              <Link href="/admin/order_list">
                <AdminSideBarItem
                  label="Захиалга"
                  icon={<PaymentOutlinedIcon className="fill-white" />}
                  selected={pathname === "/admin/order_list"}
                />
              </Link>
              <Link href="/admin/add_clothes">
                <AdminSideBarItem
                  label="Хувцас нэмэх"
                  icon={<AddBoxOutlinedIcon className="fill-white" />}
                  selected={pathname === "/admin/add_clothes"}
                />
              </Link>
            </List>
          </div>
          <div className=" flex mb-4 justify-center items-center">
            <Button
              className="bg-slate-700 text-white"
              startIcon={<LogoutOutlinedIcon />}
              onClick={() => {
                usCtx.logOut();
              }}
            >
              Системээс гарах
            </Button>
          </div>
        </aside>
      )}
    </>
  );
};

export default AdminSideBar;
