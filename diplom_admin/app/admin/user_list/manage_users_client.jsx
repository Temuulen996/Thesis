"use client";
import ActionBtn from "@/components/admin_manage_clothes/action_btn_props";
import Status from "@/components/general/status";
import GlobalContext from "@/context/global_context";
import { formatDate } from "@/utils/format_date";
import { formatPrice } from "@/utils/format_price";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { format } from "crypto-js";
import { useCallback, useContext, useState } from "react";
import * as Antd from "antd";
import * as Mui from "@mui/material";
import toast from "react-hot-toast";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
const DeleteModal = ({
  isDeleteModalOpen,
  handleDelete,
  setIsDeleteModalOpen,
}) => {
  return (
    <Antd.Modal
      className=""
      footer={() => {
        return;
      }}
      open={isDeleteModalOpen}
      onOk={handleDelete}
      onCancel={() => {
        setIsDeleteModalOpen(false);
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="font-bold text-2xl ">Устгахдаа итгэлтэй байна уу?</p>

        <div className="my-4">
          <Mui.Button
            onClick={() => {
              handleDelete?.();
            }}
            variant="text"
            className="text-green-500"
          >
            Тийм
          </Mui.Button>
          <Mui.Button
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
            variant="text"
            className="text-red-500"
          >
            Үгүй
          </Mui.Button>
        </div>
      </div>
    </Antd.Modal>
  );
};
const ManageUsersClient = ({ users }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const glCtx = useContext(GlobalContext);
  let rows = [];

  if (users) {
    rows = users.map((user) => {
      return {
        id: user?._id,
        fname: user?.fname,
        lname: user?.lname,
        role: user?.role,
        email: user?.email,
        joined: formatDate(user?.created_date),
      };
    });
  }
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "fname",
      headerName: "НЭР",
      width: 120,
    },
    {
      field: "lname",
      headerName: "ОВОГ",
      width: 120,
    },

    {
      field: "role",
      headerName: "ЭРХ",
      width: 120,
    },
    {
      field: "email",
      headerName: "EMAIL",
      width: 200,
    },
    {
      field: "joined",
      headerName: "БҮРТГҮҮЛСЭН ОГНОО",
      width: 170,
    },

    {
      field: "action",
      headerName: "ҮЙЛДЭЛ",
      width: 200,

      renderCell: (params) => {
        return (
          <div className="flex justify-start gap-4 w-full ">
            <ActionBtn
              icon={<MdDelete />}
              onClick={() => {
                setSelected(params.row);
                setIsDeleteModalOpen(true);
                // handleDelete(params.row.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    glCtx.setLoadingReq(true);
    try {
      await axios.delete(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/user/${selected?.id}`
      );
      await usCtx.loadUsers();
      glCtx.setLoadingReq(false);

      setIsDeleteModalOpen(false);
      toast.success("Амжилттай устлаа.");
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };
  return (
    <div className="mb-4">
      <DeleteModal
        handleDelete={handleDelete}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <div className="mb-4 mt-₮">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
          Хэрэглэгчийн жагсаалт
        </h2>{" "}
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 13 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageUsersClient;
