"use client";
import { products } from "@/utils/products";
import { truncateText } from "@/utils/truncate_text";
import ClothingCard from "../clothes/clothes_card";
import { useContext } from "react";
import ClothesContext from "@/context/clothes_context";

const HomeListClothes = () => {
  const clCtx = useContext(ClothesContext);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
      {clCtx.state.newClothes?.map?.((product) => {
        return <ClothingCard clothing={product} />;
      })}
    </div>
  );
};

export default HomeListClothes;
