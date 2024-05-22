import { Sidebar } from "flowbite-react";
import Link from "next/link";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
  HiFolderAdd,
  HiTemplate,
} from "react-icons/hi";
const AdminSideBar = () => {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiChartPie}>
            <Link href="/admin">Dashboard</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiTemplate} labelColor="dark">
            <Link href="/admin/clothes_list">Clothes list</Link>
          </Sidebar.Item>

          <Sidebar.Item icon={HiUser}>
            <Link href="/admin/user_list">User list</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiFolderAdd}>
            <Link href="/admin/add_clothes">Add clothes</Link>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default AdminSideBar;
