"use client";
import ActionBtn from "@/components/admin_manage_clothes/action_btn_props";
import Status from "@/components/general/status";
import ValidationModal from "@/components/general/validation_modal";
import ClothesContext from "@/context/clothes_context";
import GlobalContext from "@/context/global_context";
import { formatDate } from "@/utils/format_date";
import { formatPrice } from "@/utils/format_price";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as Antd from "antd";
import * as Mui from "@mui/material";
import axios from "axios";
import { format } from "crypto-js";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineBell, HiOutlineExclamationCircle } from "react-icons/hi";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
  MdSave,
  MdUpdate,
} from "react-icons/md";
import { FormatStatus } from "@/utils/format_status";

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
const ManageOrdersClient = ({ orders }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const glCtx = useContext(GlobalContext);
  const clCtx = useContext(ClothesContext);

  let rows = [];

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order?._id,
        user: order?.user?.fname,
        sub_total: order?.payment?.sub_total,
        total: order?.payment?.total,
        address: order?.payment?.address,
        email: order?.payment?.email,
        phone_number: order?.payment?.phone_number,
        payment_status: order?.payment?.status,
        delivery_status: order?.status,
        date: order?.date,
        estimated_date: order?.estimated_date,
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
      field: "user",
      headerName: "ХЭРЭГЛЭГЧ",
      width: 150,
    },
    {
      field: "sub_total",
      headerName: "СУУРЬ ҮНЭ(MNT)",
      width: 170,
      type: "number",

      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">
            {formatPrice(params.row.sub_total)}
          </div>
        );
      },
    },
    {
      field: "total",
      headerName: "НИЙТ(MNT)",
      width: 170,
      type: "number",

      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">
            {formatPrice(params.row.total)}
          </div>
        );
      },
    },
    {
      field: "address",
      headerName: "ХАЯГ",
      width: 170,
    },
    {
      field: "email",
      headerName: "EMAIL",
      width: 170,
    },

    {
      field: "phone_number",
      headerName: "УТАС",
      width: 120,
    },
    {
      field: "payment_status",
      headerName: "PAYMENT STATUS",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="">{FormatStatus(params?.row?.payment_status)}</div>
        );
      },
    },
    {
      field: "delivery_status",
      headerName: "ХҮРГЭЛТИЙН ТӨЛӨВ",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="">{FormatStatus(params?.row?.delivery_status)}</div>
        );
      },
    },
    {
      field: "date",
      headerName: "ЗАХИАЛСАН ОГНОО",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full ">
            {formatDate(params?.row?.date)}
          </div>
        );
      },
    },
    {
      field: "estimated_date",
      headerName: "ХҮРГЭГДЭХ ОГНОО",
      width: 160,

      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full ">
            {formatDate(params?.row?.estimated_date)}
          </div>
        );
      },
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
                // handleDelete(params.row.id);
                setSelected(params.row);
                setIsDeleteModalOpen(true);
              }}
            />
            <ActionBtn
              icon={<MdUpdate />}
              onClick={() => {
                console.log(params.row);
                setSelected(params.row);
                glCtx.setOpenModal(true);
              }}
            />
          </div>
        );
      },
    },
  ];
  // const handleToggleStock = useCallback((id , inStock , ))
  const handleDelete = async (id) => {
    console.log(selected);
    glCtx.setLoadingReq(true);
    try {
      await axios.delete(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/order/${selected?.id}`
      );
      console.log("sda");
      await clCtx.loadOrders();
      glCtx.setLoadingReq(false);
      setIsDeleteModalOpen(false);
      toast.success("Амжилттай устлаа.");
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };
  const handleUpdate = async (data) => {
    try {
      const res = await axios.put(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/order/${data.id}`,
        {
          ...data,
        }
      );
      await clCtx.loadOrders();
    } catch (err) {
      console.log(err);
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
          Захиалгын жагсаалт
        </h2>
      </div>
      <div style={{ width: "100%" }}>
        <ValidationModal
          component={
            <div className="text-center">
              <HiOutlineBell className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Захиалгын мэдээллийг өөрчлөх.
              </h3>
              <div className="flex flex-col  justify-center gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FormControl className="w-full">
                      <InputLabel id="demo-simple-select-helper-label">
                        Захиалгын төлөв
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => {
                          setSelected((prev) => ({
                            ...prev,
                            delivery_status: e.target.value,
                          }));
                        }}
                        defaultValue={selected?.delivery_status}
                        label="Захиалгын төлөв"
                      >
                        <MenuItem value="Pending">Хүлээгдэж буй</MenuItem>
                        <MenuItem value="Complete">Амжилттай</MenuItem>
                        <MenuItem value="Cancelled">Цуцлагдсан</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className="w-full">
                      <InputLabel id="demo-simple-select-helper-label">
                        Төлбөрийн төлөв
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => {
                          setSelected((prev) => ({
                            ...prev,
                            payment_status: e.target.value,
                          }));
                        }}
                        label="Төлбөрийн төлөв"
                        defaultValue={selected?.payment_status}
                      >
                        <MenuItem value="Paid">Төлсөн</MenuItem>
                        <MenuItem value="Pending">Хүлээгдэж буй</MenuItem>
                        <MenuItem value="Cancelled">Цуцлагдсан</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <Button
                  onClick={async () => {
                    toast.promise(handleUpdate(selected), {
                      loading: "Түр хүлээнэ үү...",
                      error: "Алдаа гарлаа!",
                      success: "Амжилттай хадгаллаа....",
                    });

                    glCtx.setOpenModal(false);
                  }}
                >
                  Хадгалах
                </Button>
              </div>
            </div>
          }
        />
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

export default ManageOrdersClient;
