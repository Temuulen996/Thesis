// components/AddProductPage.js
import UserContext from "@/context/user_context";
import axios from "axios";
import React, { useContext, useState } from "react";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import ClothesContext from "@/context/clothes_context";
import GlobalContext from "@/context/global_context";
import ValidationModal from "../../../components/general/validation_modal";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Autocomplete, Box, TextField } from "@mui/material";
import { Button } from "flowbite-react";

const initialClothesState = {
  name: "",
  category: null,
  price: "",
  description: "",
  rating: "",
  used_month: "",
  images: null,
  gender: "",
  size: "",
};
// Admin page-д шинэ хувцасны мэдээллийг оруулах талбарын component.
const AddClothes = ({ onAddProduct }) => {
  const [clothes, setClothes] = useState({
    name: null,
    category: null,
    price: null,
    description: null,
    rating: null,
    used_month: null,
    images: null,
    gender: null,
    size: null,
  });
  const [categoryName, setCategoryName] = useState("");
  const [writeCategory, setWriteCategory] = useState(false);
  const usCtx = useContext(UserContext);
  const clCtx = useContext(ClothesContext);
  const glCtx = useContext(GlobalContext);
  const store = async (e) => {
    // glCtx.setLoadingReq(true);

    const formData = new FormData();

    formData.append("name", clothes.name);
    formData.append("category_id", clothes.category);
    formData.append("price", clothes.price);
    formData.append("rating", clothes.rating);
    formData.append("used_month", clothes.used_month);
    formData.append("description", clothes.description);
    formData.append("gender", clothes.gender);
    formData.append("size", clothes.size);
    formData.append("type", "web");

    if (clothes.images) {
      for (let i = 0; i < clothes.images.length; i++) {
        formData.append("images", clothes.images[i]);
      }
    }
    console.log(clothes);
    const token = getCookie("admin_token");

    const response = await axios.post(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.API_URL
      }/api/clothes`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setClothes({
      name: null,
      category: null,
      price: null,
      description: null,
      rating: null,
      used_month: null,
      image: null,
      size: null,
      gender: null,
    });
    document.getElementById("clothesName").value = null;
    document.getElementById("category").value = null;
    document.getElementById("image").value = null;
    document.getElementById("price").value = null;
    document.getElementById("rating").value = null;
    document.getElementById("usedMonth").value = null;
    document.getElementById("gender").value = null;
    document.getElementById("size").value = null;
    document.getElementById("clothesDescription").value = null;
    // document.getElementById("categoryText").value = null;

    // toast.success("Бүтээгдэхүүнийг амжилттай бүртгэлээ.");
    // glCtx.setLoadingReq(false);
  };
  const resetForm = () => {
    setClothes(initialClothesState);
    // If using refs for file inputs or other uncontrolled components:
    // yourFileInputRef.current.value = "";
  };

  return (
    <div className="w-full ml-4">
      <ValidationModal
        component={
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Хувцас шинээр нэмэх үү?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={async () => {
                  glCtx.setOpenModal(false);
                  toast.promise(store(), {
                    loading: "Түр хүлээнэ үү...",
                    error: "Алдаа гарлаа!",
                    success: "Амжилттай нэмэгдлээ....",
                  });
                  // store();
                }}
              >
                {"Тийм"}
              </Button>
              <Button color="failure" onClick={() => glCtx.setOpenModal(false)}>
                Үгүй
              </Button>
            </div>
          </div>
        }
      />
      <form
        className="bg-white p-8 rounded-md shadow-xl"
        onSubmit={(e) => {
          // store(e);
          glCtx.setOpenModal(true);
          e.preventDefault();
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
          Хувцас нэмэх
        </h2>
        <div className="w-full grid grid-cols-2 gap-4 mb-2">
          <div className="">
            <label
              htmlFor="clothesId"
              className="block text-sm font-medium text-gray-900"
            >
              Нэр
            </label>
            <input
              required
              type="text"
              id="clothesName"
              name="clothesId"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Бүтээгдэхүүний нэр"
              value={clothes.id}
              onChange={(e) => setClothes({ ...clothes, name: e.target.value })}
            />
          </div>
          <div className="">
            <label
              for="countries"
              class="block  text-sm  text-slate-700 dark:text-white col-span-12"
            >
              Хувцасны төрөл
            </label>

            <Autocomplete
              className="border-black "
              value={
                clCtx.state?.categories?.find?.(
                  (c) => c._id === clothes.category
                ) || null
              }
              onChange={(e, newValue) => {
                console.log(newValue);
                setCategoryName(newValue?.name);
                setClothes((prev) => {
                  return { ...prev, category: newValue?._id };
                });
              }}
              id="category"
              disableClearable
              options={clCtx.state.categories?.map?.((option) => option)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  className="border-black"
                  id="categoryText"
                  {...params}
                  label=""
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            {/* <select
                required
                id="category"
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected value={null}>
                  {" "}
                </option>
                {clCtx?.state.categories?.map?.((el, i) => (
                  <option key={i} value={el._id}>
                    {el.name}
                  </option>
                ))}
              </select> */}
          </div>
          <div className="">
            <label
              for="countries"
              class="block mb-2 text-sm  text-gray-900 dark:text-white"
            >
              Хэмжээ
            </label>
            <select
              required
              id="size"
              onChange={(e) => setClothes({ ...clothes, size: e.target.value })}
              class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value={null}>
                {" "}
              </option>

              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra large</option>
              <option value="XXL">2X Large</option>
            </select>
          </div>
          <div className="">
            <label
              for="countries"
              class="block mb-2 text-sm text-slate-700 dark:text-white"
            >
              Хүйс
            </label>
            <select
              required
              id="gender"
              onChange={(e) =>
                setClothes({ ...clothes, gender: e.target.value })
              }
              class="bg-gray-50 border  border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value={null}>
                {" "}
              </option>

              <option value="FM">Эмэгтэй</option>
              <option value="M">Эрэгтэй</option>
              <option value="BTH">Хоёулаа өмсөх боломжтой</option>
            </select>
          </div>
          <div class="">
            <label class="block text-gray-700 text-sm mb-2" for="price">
              Үнэ
            </label>
            <input
              required
              onChange={(e) =>
                setClothes({ ...clothes, price: e.target.value })
              }
              type="number"
              id="price"
              name="price"
              min={0}
              placeholder="Үнийн дүнгээ бичнэ үү."
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="">
            <label class="block text-gray-700 text-sm mb-2" for="price">
              Үнэлгээ
            </label>
            <input
              onChange={(e) =>
                setClothes({ ...clothes, rating: e.target.value })
              }
              type="number"
              min={0}
              max={100}
              id="rating"
              name="price"
              placeholder="Үнэлгээний хувийг оруулна уу."
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="">
            <label class="block text-gray-700 text-sm  mb-2" for="price">
              Ашигласан сар
            </label>
            <input
              onChange={(e) =>
                setClothes({ ...clothes, used_month: e.target.value })
              }
              type="number"
              min={0}
              max={300}
              id="usedMonth"
              name="price"
              placeholder="Ашигласан сарыг оруулна уу."
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="">
            <label class="block text-gray-700 text-sm mb-2" for="file">
              Зургаа оруулна уу.
            </label>
            <input
              required
              onChange={(e) => {
                setClothes({ ...clothes, images: e.target.files });
              }}
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid  border-black bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              id="image"
              multiple
            />
          </div>
          <div className="">
            <label
              htmlFor="clothesDescription"
              className="block text-sm  text-gray-900"
            >
              Хувцасны мэдээлэл
            </label>
            <textarea
              required
              id="clothesDescription"
              name="clothesDescription"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Дэлгэрэнгүй мэдээллийг оруулна уу."
              value={clothes.description}
              onChange={(e) =>
                setClothes({ ...clothes, description: e.target.value })
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Бүртгэх
        </button>
      </form>
    </div>
  );
};

export default AddClothes;
