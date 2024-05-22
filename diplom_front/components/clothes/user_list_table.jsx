import UserContext from "@/context/user_context";
import { formatDate } from "@/utils/format_date";
import { Table } from "flowbite-react";
import moment from "moment/moment";
import React, { useContext } from "react";

// Admin page-дээр байгаа user-ийг хянах table-ийн component.
const UserListTable = ({ users }) => {
  const usCtx = useContext(UserContext);
  return (
    <div className=" ml-4  h-[750px]">
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Овог</Table.HeadCell>
          <Table.HeadCell>Нэр</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Бүртгэгдсэн огноо</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {" "}
          {usCtx.state.users?.map?.((user, i) => (
            <Table.Row
              key={i}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user._id}
              </Table.Cell>
              <Table.Cell> {user.lname}</Table.Cell>
              <Table.Cell>{user.fname}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell> {user.role}</Table.Cell>
              <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default UserListTable;
