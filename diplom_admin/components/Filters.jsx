"use client";

import ClothesContext from "@/context/clothes_context";
import GlobalContext from "@/context/global_context";
import { Box, Button, Slider } from "@mui/material";
import { TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
//дэлгүүр хуудасны хувцсыг шүүн харуулах үйлдлийг хийх component.
function valuetext(value) {
  return `${value}°C`;
}
const Filters = () => {
  const [minPrice, setMinPrice] = useState(null);
  const [value, setValue] = React.useState([20, 37]);

  const [maxPrice, setMaxPrice] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const clCtx = useContext(ClothesContext);
  const glCtx = useContext(GlobalContext);
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
    <div className=" px-4 bg-[#D9D9D9] sticky  top-28 z-50 h-auto w-full ">
      <div className=" px-6 py-4 border border-gray-200  rounded shadow-sm ">
        <h3 className="font-semibold mb-2">Үнэ</h3>
        <div className="grid md:grid-cols-1 gap-x-2">
          <Box className="">
            <Slider
              id="price"
              getAriaLabel={() => "Temperature range"}
              value={[minPrice, maxPrice]}
              max={1000000}
              min={0}
              valueLabelDisplay="auto"
              onChange={handlePriceChange}
              getAriaValueText={valuetext}
            />
          </Box>
        </div>
        <div className="mb-6">
          <TextInput
            placeholder="Нэрээр шүүх.."
            value={filterText}
            id="filtertext"
            type="text"
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
        </div>
        <h3 className="font-semibold mb-2">Хэмжээ</h3>
        <div className=" mb-4">
          {sizeOptions?.map?.((size) => (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sizes"
                name="sizes"
                value={size.size}
                checked={selectedSizes.includes(size.size)}
                onChange={() => handleSizeChange(size.size)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={size.name}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {size.name}
              </label>
            </div>
          ))}
        </div>
        <h3 className="font-semibold mb-2">Төрөл</h3>
        <div className=" mb-4">
          {clCtx?.state.categories?.map?.((category) => (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="categories"
                name="categories"
                value={category._id}
                checked={selectedCategory.includes(category._id)}
                onChange={() => handleCategoryChange(category._id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={category.name}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
        <h3 className="font-semibold mb-2">Хүйс</h3>
        <div className="mb-4">
          {genderOptions?.map?.((gender) => (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sizes"
                name="sizes"
                value={gender.value}
                checked={selectedGender.includes(gender.value)}
                onChange={() => handleGenderChange(gender.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={gender.name}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {gender.name}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <Button
            className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            onClick={async () => {
              console.log(selectedGender);
              glCtx.setLoadingReq(true);
              clCtx.filterClothes(
                minPrice,
                maxPrice,
                filterText,
                selectedSizes,
                selectedCategory,
                selectedGender
              );
              glCtx.setLoadingReq(false);
            }}
            color="secondary"
          >
            Secondary
          </Button>

          <Button
            onClick={() => {
              document.getElementById("price").value = [0, 0];
              // document.getElementById("maxPrice").value = null;
              document.getElementById("filtertext").value = "";
              document.getElementById("sizes").checked = false;
              document.getElementById("categories").checked = false;
              setMaxPrice(null);
              setMinPrice(null);
              setFilterText(null);
              setSelectedSizes([]);
              setSelectedCategory([]);
            }}
            className="mt-2 px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            Шүүлт цэвэрлэх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
