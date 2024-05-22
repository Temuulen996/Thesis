"use client";
import React from "react";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import Image from "next/image";
import { formatPrice } from "@/utils/format_price";
import { Rating } from "@mui/material";

const ClothesItem = ({ clothes }) => {
  return (
    <div className="group relative   shadow-xl">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          alt=""
          width={500}
          height={500}
          src={clothes.images[0]}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="py-2 px-2 w-full">
        <div>
          <h3 className="text-lg font-bold text-gray-700 ml-2">
            {/* нэг хувцасны detail хэсэгрүү URL-ээр id-Г нь дамжуулан шилжинэ. */}
            <Link href={`/clothes/${clothes._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {clothes.name}
            </Link>
          </h3>
          <h3 className="text-sm text-gray-700">
            {/* нэг хувцасны detail хэсэгрүү URL-ээр id-Г нь дамжуулан шилжинэ. */}
            <Link href={`/clothes/${clothes._id}`}>
              <Rating value={clothes.rating / 20} readOnly />
            </Link>
          </h3>
          <div className="w-full flex justify-end">
            <p className="text-md font-semibold text-slate-800">
              {formatPrice(clothes.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothesItem;
