"use client";
import { formatPrice } from "@/utils/format_price";
import { truncateText } from "@/utils/truncate_text";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const ClothingCard = ({ clothing, bgcolor }) => {
  return (
    <>
      <Link href={`clothes/${clothing._id}`}>
        <div
          className={`col-span-1 cursor-pointer border-[1.2px] text-slate-700 border-slate-200 ${bgcolor} rounded-sm p-2 duration-100 transition-all  hover:scale-105 text-center text-sm shadow-xl`}
        >
          <div className="flex flex-col items-center w-full gap-1 ">
            <div className="relative w-full overflow-hidden aspect-square ">
              <Image
                fill
                className="object-contain w-full h-full"
                src={clothing.images[0]}
              />
            </div>
            <div className="mt-4 ">{truncateText(clothing.name)}</div>
            <div>
              <Rating value={clothing.rating / 20} readOnly />
            </div>
            <div className="font-semibold">{formatPrice(clothing.price)}</div>
            <div></div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ClothingCard;
