"use client";
import Link from "next/link";
import Container from "../general/container";
import AdminNavItem from "./admin_nav_item";
import {
  MdAdd,
  MdBalance,
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdFormatListBulletedAdd,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { DashboardCustomize } from "@mui/icons-material";
import { useContext } from "react";
import UserContext from "@/context/user_context";
const AdminNav = () => {
  const usCtx = useContext(UserContext);
  const pathname = usePathname();
  return (
    <>
      <div className="w-full shadow-sm top-20 border-b-[1] pt-4">
        <Container>
          <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
            <Link href="/admin">
              <AdminNavItem
                label="Summary"
                icon={<MdBalance />}
                selected={pathname === "/admin"}
              />
            </Link>
            <Link href="/admin/add_clothes">
              <AdminNavItem
                label="Хувцас нэмэх"
                icon={<MdAdd />}
                selected={pathname === "/admin/add_clothes"}
              />
            </Link>
            <Link href="/admin/user_list">
              <AdminNavItem
                label="Хэрэглэгч"
                icon={<MdSupervisedUserCircle />}
                selected={pathname === "/admin/user_list"}
              />
            </Link>
            <Link href="/admin/clothes_list">
              <AdminNavItem
                label="Хувцас"
                icon={<MdDashboard />}
                selected={pathname === "/admin/clothes_list"}
              />
            </Link>
            <Link href="/admin/order_list">
              <AdminNavItem
                label="Захиалга"
                icon={<MdFormatListBulletedAdd />}
                selected={pathname === "/admin/order_list"}
              />
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AdminNav;
