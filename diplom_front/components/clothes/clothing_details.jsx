import { product } from "@/utils/product";
import { Rating } from "@mui/material";
import { useContext, useState } from "react";
import Button from "../general/button";
import ClothingDetailImage from "./clothing_detail_image";
import PageLoader from "../general/loader_page";
import { formatPrice } from "@/utils/format_price";
import toast from "react-hot-toast";
import ClothesContext from "@/context/clothes_context";
import { FormatClothingStatus } from "@/utils/format_clothing_status";
import { FormatGender } from "@/utils/format_gender";
const Horizontal = () => {
  return <hr className="w-[30%] my-2 bg-slate-500" />;
};
const ClothingDetails = ({ clothing, inCart, setInCart }) => {
  const clCtx = useContext(ClothesContext);
  console.log(inCart);
  if (!clothing) return <PageLoader />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-4">
      <ClothingDetailImage clothing={clothing} />
      <div className="flex flex-col gap-1 text-slate-700 ml-2">
        <h2 className="text-3xl font-medium text-slate-700">{clothing.name}</h2>

        <div className="flex items-center gap-2">
          <Rating value={clothing.rating / 20} readOnly />
          <div>{clothing.review} үзэлт</div>
        </div>
        <Horizontal />
        <div className="text-justify  overflow-hidden">
          {clothing.description}
        </div>
        <Horizontal />
        <div>
          <span className="font-semibold">
            Төрөл: {clothing.category_id.name}
          </span>
        </div>
        <div>
          <span className="font-semibold">
            Хэрэглэсэн сар:{" "}
            {clothing.used_month && `${clothing.used_month} сар`}
          </span>
        </div>
        <div>
          <span className="font-semibold">
            Төлөв: {FormatClothingStatus(clothing.status)}
          </span>
        </div>
        <div>
          <span className="font-semibold">
            Хүйс: {FormatGender(clothing.gender)}
          </span>
        </div>
        <div>
          <span className="font-semibold">Хэмжээ: {clothing.size}</span>
        </div>
        <Horizontal />
        <div>
          <span className="font-bold text-3xl ">
            {formatPrice(clothing.price)}
          </span>
        </div>
        <Horizontal />
        <div className="max-w-[300px]">
          {inCart ? (
            <p className="text-green-500 font-bold text-2xl text-justify">
              Энэ хувцас аль хэдийн сагслагдсан байна!
            </p>
          ) : (
            <Button
              disabled={inCart ? true : false}
              label="Сагсанд нэмэх"
              onClick={() => {
                clCtx.addToCart(clothing._id);
                setInCart(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothingDetails;
