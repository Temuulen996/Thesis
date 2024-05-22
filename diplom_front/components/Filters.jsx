"use client";

import ClothesContext from "@/context/clothes_context";
import GlobalContext from "@/context/global_context";
import { Box, Button, Slider } from "@mui/material";
import { Checkbox, Input } from "antd";
import { TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useContext, useState } from "react";
//дэлгүүр хуудасны хувцсыг шүүн харуулах үйлдлийг хийх component.
function valuetext(value) {
  return `${value}°C`;
}
const Filters = ({ page, setTotalPages, setFiltered }) => {
  const [minPrice, setMinPrice] = useState(null);
  const [value, setValue] = React.useState([20, 37]);

  const [maxPrice, setMaxPrice] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const clCtx = useContext(ClothesContext);
  const glCtx = useContext(GlobalContext);
  const fetchClothes = async () => {
    // console.log(minPrice);
    // console.log("acaallaaa");

    // if (searchParams.get("all") !== "false") {
    //   console.log("step1");
    //   glCtx.setLoadingReq(true);
    //   fetch(
    //     `${
    //       process.env.NODE_ENV === "production"
    //         ? process.env.PRODUCTION_API_URL
    //         : process.env.API_URL
    //     }/api/clothes?page=${page}&limit=12`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       clCtx.setState((prev) => {
    //         return {
    //           ...prev,
    //           clothes: data.data,
    //           filterMaxPrice: data.maxPrice,
    //           filterMinPrice: data.minPrice,
    //         };
    //       });
    //       console.log(data);
    //       setTotalPages(data.totalPages);
    //     })
    //     .finally(() => {
    //       glCtx.setLoadingReq(false);
    //     });
    // } else {

    // }

    glCtx.setLoadingReq(true);
    setFiltered(true);
    await clCtx.filterClothes(
      minPrice,
      maxPrice,
      filterText,
      selectedSizes,
      selectedCategory,
      selectedGender
    );
    glCtx.setLoadingReq(false);
  };

  const GetAll = async () => {
    glCtx.setLoadingReq(true);
    setFiltered(false);
    fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.API_URL
      }/api/clothes?page=${page}&limit=12`
    )
      .then((res) => res.json())
      .then((data) => {
        clCtx.setState((prev) => {
          return {
            ...prev,
            clothes: data.data,
            filterMaxPrice: data.maxPrice,
            filterMinPrice: data.minPrice,
          };
        });
        console.log(data);
        setMaxPrice(0);
        setMinPrice(0);
        setFilterText("");
        setSelectedSizes([]);
        setSelectedCategory([]);
        setTotalPages(data.totalPages);
      })
      .finally(() => {
        glCtx.setLoadingReq(false);
      });
  };
  const sizeOptions = [
    { name: "Small", size: "S" },
    { name: "Medium", size: "M" },
    { name: "Large", size: "L" },
    { name: "Extra large", size: "XL" },
  ];
  const genderOptions = [
    { name: "Female", value: "FM" },
    { name: "Male", value: "M" },
  ];
  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  const handleCategoryChange = (category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((s) => s !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
    console.log(selectedCategory);
  };
  const handleGenderChange = (gender) => {
    if (selectedGender.includes(gender)) {
      setSelectedGender(selectedGender.filter((g) => g !== gender));
    } else {
      setSelectedGender([...selectedGender, gender]);
    }
  };
  const handlePriceChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };
  return (
    <div className=" px-4 bg-[#D9D9D9]   top-28 z-50 w-full ">
      <div className=" px-6 py-4   rounded shadow-sm ">
        <h3 className="font-semibold mb-2">Үнэ</h3>
        <div className="grid md:grid-cols-1 gap-x-2">
          <Box className="">
            <Slider
              id="price"
              getAriaLabel={() => "Temperature range"}
              value={[minPrice, maxPrice]}
              max={clCtx.state.filterMaxPrice}
              min={clCtx.state.filterMinPrice}
              valueLabelDisplay="auto"
              onChange={handlePriceChange}
              getAriaValueText={valuetext}
            />
          </Box>
        </div>
        <div className="mb-6">
          <Input
            placeholder="Нэрээр шүүх.."
            value={filterText}
            id="filtertext"
            type="text"
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
          {/* <TextInput
            placeholder="Нэрээр шүүх.."
            value={filterText}
            id="filtertext"
            type="text"
            onChange={(e) => {
              setFilterText(e.target.value);
            }} */}
          {/* /> */}
        </div>
        <h3 className="font-semibold mb-2">Хэмжээ</h3>
        <div className=" mb-4">
          {sizeOptions?.map?.((size, i) => (
            <div className="flex items-center" key={i}>
              <Checkbox
                value={size.size}
                checked={selectedSizes.includes(size.size)}
                onChange={() => handleSizeChange(size.size)}
              >
                {size.name}
              </Checkbox>
            </div>
          ))}
        </div>
        <h3 className="font-semibold mb-2">Төрөл</h3>
        <div className=" mb-4">
          {clCtx?.state.categories?.map?.((category, i) => (
            <div className="flex items-center" key={i}>
              <Checkbox
                value={category._id}
                onChange={() => {
                  handleCategoryChange(category._id);
                }}
                checked={selectedCategory.includes(category._id)}
              >
                {category.name}
              </Checkbox>
            </div>
          ))}
        </div>
        <h3 className="font-semibold mb-2">Хүйс</h3>
        <div className="mb-4">
          {genderOptions?.map?.((gender, i) => (
            <div className="flex items-center" key={i}>
              <Checkbox
                value={gender.value}
                checked={selectedGender.includes(gender.value)}
                onChange={() => handleGenderChange(gender.value)}
              >
                {gender.name}
              </Checkbox>
            </div>
          ))}
        </div>
        <div className="mb-4">
          {/* <Link
            className="px-1 py-2 text-center w-full inline-block text-white bg-slate-700 border border-transparent rounded-md hover:opacity-80 transition"
            href={`/shop?minPrice=${minPrice}&maxPrice=${maxPrice}&filterText=${filterText}&selectedSizes=${selectedSizes}&selectedCategory=${selectedCategory}&selectedGender=${selectedGender}&all=false`}
            onClick={async () => { }}
          >
            Шүүх
          </Link> */}

          <button
            className="px-1 py-2 text-center w-full inline-block text-white bg-slate-700 border border-transparent rounded-md hover:opacity-80 transition"
            onClick={() => {
              fetchClothes();
            }}
          >
            Шүүх
          </button>

          <button
            onClick={() => {
              GetAll();
            }}
            className="mt-2 px-1 py-2 text-center w-full inline-block text-white bg-slate-700 border border-transparent rounded-md hover:opacity-80 transition"
          >
            Шүүлт цэвэрлэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
