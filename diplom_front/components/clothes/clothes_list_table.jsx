import ClothesContext from "@/context/clothes_context";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { Table } from "flowbite-react";
import { formatPrice } from "@/utils/format_price";
import { formatDate } from "@/utils/format_date";

// Admin page-дээр байгаа clothes-ийг хянах table-ийн component.
const ClothesListTable = () => {
  const clCtx = useContext(ClothesContext);
  useEffect(() => {
    const init = async () => {
      const { Tooltip, initTE } = await import("tw-elements");
      initTE({ Tooltip });
    };
    init();
  }, []);
  return (
    <div className="w-full ml-4 overflow-x-scroll h-[750px]">
      <Table>
        <Table.Head className="sticky">
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Нэр</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Үнэ</Table.HeadCell>
          <Table.HeadCell>Мэдээлэл</Table.HeadCell>
          <Table.HeadCell>Хүйс</Table.HeadCell>
          <Table.HeadCell>Хэмжээ</Table.HeadCell>
          <Table.HeadCell>Үнэлгээ</Table.HeadCell>
          <Table.HeadCell>Ашигласан сар</Table.HeadCell>
          <Table.HeadCell>Төрөл</Table.HeadCell>
          <Table.HeadCell>Зарагдсан эсэх</Table.HeadCell>
          <Table.HeadCell>Төлөв</Table.HeadCell>
          <Table.HeadCell>Огноо</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {clCtx.state.clothes?.map?.((clothes, i) => (
            <Table.Row
              key={i}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {clothes?._id}
              </Table.Cell>
              <Table.Cell>{clothes?.name}</Table.Cell>
              <Table.Cell>{clothes?.category_id.name}</Table.Cell>
              <Table.Cell>{formatPrice(clothes?.price)}</Table.Cell>
              <Table.Cell>{clothes?.description}</Table.Cell>
              <Table.Cell>{clothes?.gender}</Table.Cell>
              <Table.Cell>{clothes?.size}</Table.Cell>
              <Table.Cell>{clothes?.rating}</Table.Cell>
              <Table.Cell>{clothes?.used_month}</Table.Cell>
              <Table.Cell>{clothes?.type}</Table.Cell>
              <Table.Cell>{clothes?.is_sold ? "Тийм" : "Үгүй"}</Table.Cell>
              <Table.Cell>{clothes?.status}</Table.Cell>
              <Table.Cell>{formatDate(clothes?.created_date)}</Table.Cell>
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

export default ClothesListTable;
