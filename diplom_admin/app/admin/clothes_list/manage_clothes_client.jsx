"use client";
import ActionBtn from "@/components/admin_manage_clothes/action_btn_props";
import Status from "@/components/general/status";
import ValidationModal from "@/components/general/validation_modal";
import GlobalContext from "@/context/global_context";
import UserContext from "@/context/user_context";
import { formatDate } from "@/utils/format_date";
import { formatPrice } from "@/utils/format_price";
import ClearIcon from "@mui/icons-material/Clear";
import {
  CheckCircleOutline,
  CleaningServicesTwoTone,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { getCookie } from "cookies-next";
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
import * as Antd from "antd";
import * as Mui from "@mui/material";
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
const ManageClothesClient = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [clothes, setClothes] = useState(null);

  const glCtx = useContext(GlobalContext);
  const usCtx = useContext(UserContext);
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    glCtx.setLoadingReq(true);
    console.log("object");
    const token = getCookie("admin_token");
    try {
      const res = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/clothes/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClothes(res.data.data);
      glCtx.setLoadingReq(false);
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };
  let initialRows = [];

  if (clothes) {
    initialRows = clothes.map((clothing) => {
      return {
        id: clothing?._id,
        name: clothing?.name,
        price: clothing?.price,
        buy_price: clothing?.buy_price,
        category: clothing?.category_id?.name,
        rating: clothing?.rating,
        isSold: clothing?.isSold,
        isAvailableToSell: clothing?.isAvailableToSell,
        gender: clothing?.gender,
        size: clothing?.size,
        type: clothing?.type,
        created_date: clothing?.created_date,
        images: clothing?.images,
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
      field: "name",
      headerName: "НЭР",
      width: 120,
    },
    {
      field: "buy_price",
      headerName: "АВСАН ҮНЭ(MNT)",
      width: 220,
      type: "number",

      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">
            {params.row.buy_price
              ? formatPrice(params.row.buy_price)
              : formatPrice(0)}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "ҮНЭ(MNT)",
      width: 220,
      type: "number",

      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">
            {formatPrice(params.row.price)}
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "CATEGORY",
      width: 130,
    },
    {
      field: "rating",
      headerName: "ҮНЭЛГЭЭ",
      width: 80,
      type: "number",
    },
    {
      field: "isSold",
      headerName: "ЗАРАГДСАН ЭСЭХ",
      width: 150,

      // editComponent: ({ value, onChange }) => (
      //   <Select
      //     options={fruitsList}
      //     name="fruitSelect"
      //     onChange={(selectedOption) => onChange(selectedOption.value)}
      //     value={value ? value.value : value}
      //   />
      // ),

      renderCell: (params) => {
        return (
          <div className="">
            {params.row.isSold === true ? (
              <Status
                text="Худалдаалагдсан"
                icon={<MdClose />}
                bg="bg-rose-200"
                color=" text-rose-700"
              />
            ) : (
              <Status
                text="Худалдаалагдаагүй"
                icon={<MdDone />}
                bg="bg-orange-200"
                color="text-orange-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "isAvailableToSell",
      headerName: "ЗАРАГДАХ БОЛОМЖТОЙ ЭСЭХ",
      width: 150,

      // editComponent: ({ value, onChange }) => (
      //   <Select
      //     options={fruitsList}
      //     name="fruitSelect"
      //     onChange={(selectedOption) => onChange(selectedOption.value)}
      //     value={value ? value.value : value}
      //   />
      // ),

      renderCell: (params) => {
        return (
          <div className="">
            {params.row.isAvailableToSell === true ? (
              <Status
                text="Боломжтой"
                icon={<CheckCircleOutline />}
                bg="bg-green-300"
                color=" text-green-700"
              />
            ) : (
              <Status
                text="Боломжгүй"
                icon={<ClearIcon />}
                bg="bg-red-200"
                color="text-red-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "gender",
      headerName: "ХҮЙС",
      width: 80,
    },
    {
      field: "size",
      headerName: "ХЭМЖЭЭ",
      width: 80,
    },
    {
      field: "type",
      headerName: "ТӨРӨЛ",
      width: 120,
    },
    {
      field: "created_date",
      headerName: "БҮРТГЭГДСЭН ОГНОО",
      width: 150,

      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full ">
            {formatDate(params.row.created_date)}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "ҮЙЛДЭЛ",
      width: 120,

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
    glCtx.setLoadingReq(true);
    try {
      await axios.delete(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/clothes/${selected?.id}`
      );
      const token = getCookie("admin_token");
      const res = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/clothes/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClothes(res.data.data);
      glCtx.setLoadingReq(false);
      setIsDeleteModalOpen(false);
      toast.success("Амжилттай устлаа.");
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };
  const handleUpdate = async (data) => {
    console.log(data);

    try {
      const res = await axios.put(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/clothes/${data.id}`,
        {
          ...data,
          created_date: new Date(selected.created_date),
        }
      );

      const ress = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/clothes/all`,
        {
          headers: { Authorization: `Bearer ${getCookie("admin_token")}` },
        }
      );
      setClothes(ress.data.data);
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
          Хувцасны жагсаалт
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
                    <TextField
                      onChange={(e) => {
                        setSelected((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                      value={selected?.name}
                      id="standard-basic"
                      label="Нэр"
                      variant="standard"
                    />
                  </div>
                  <div>
                    <TextField
                      onChange={(e) => {
                        setSelected((prev) => ({
                          ...prev,
                          price: parseFloat(e.target.value),
                        }));
                      }}
                      value={selected?.price}
                      type="number"
                      id="standard-basic"
                      label="Үнэ"
                      variant="standard"
                    />
                  </div>
                  <div>
                    <TextField
                      onChange={(e) => {
                        setSelected((prev) => ({
                          ...prev,
                          rating: parseFloat(e.target.value),
                        }));
                      }}
                      value={selected?.rating}
                      type="number"
                      id="standard-basic"
                      label="Үнэлгээ"
                      variant="standard"
                    />
                  </div>
                  <div>
                    <FormControl className="w-full">
                      <InputLabel id="demo-simple-select-helper-label">
                        Зарагдсан эсэх
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => {
                          setSelected((prev) => ({
                            ...prev,
                            isSold: e.target.value,
                          }));
                        }}
                        defaultValue={selected?.isSold}
                        label="Захиалгын төлөв"
                      >
                        <MenuItem value={true}>Тийм</MenuItem>
                        <MenuItem value={false}>Үгүй</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className="w-full">
                      <InputLabel id="demo-simple-select-helper-label">
                        Хүйс
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => {
                          setSelected((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }));
                        }}
                        defaultValue={selected?.gender}
                        label="Захиалгын төлөв"
                      >
                        <MenuItem value="M">Эрэгтэй</MenuItem>
                        <MenuItem value="FM">Эмэгтэй</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className="w-full">
                      <InputLabel id="demo-simple-select-helper-label">
                        Хэмжээ
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => {
                          setSelected((prev) => ({
                            ...prev,
                            size: e.target.value,
                          }));
                        }}
                        defaultValue={selected?.size}
                        label="Хэмжээ"
                      >
                        <MenuItem value="S">S</MenuItem>
                        <MenuItem value="M">M</MenuItem>
                        <MenuItem value="L">L</MenuItem>
                        <MenuItem value="XL">XL</MenuItem>
                        <MenuItem value="XXL">XXL</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className="w-full">
                      <InputLabel id="demo-simple-select-helper-label">
                        Зарагдах боломтой эсэх
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => {
                          setSelected((prev) => ({
                            ...prev,
                            isAvailableToSell: e.target.value,
                          }));
                        }}
                        label="Төлбөрийн төлөв"
                        defaultValue={selected?.isAvailableToSell}
                      >
                        <MenuItem value={true}>Тийм</MenuItem>
                        <MenuItem value={false}>Үгүй</MenuItem>
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
          rows={initialRows}
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

export default ManageClothesClient;
