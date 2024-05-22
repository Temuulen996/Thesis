"use client";
import React from "react";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import Image from "next/image";
import { formatPrice } from "@/utils/format_price";

const ClothesItem = ({ clothes }) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          width={500}
          height={500}
          src={clothes.images[0]}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            {/* нэг хувцасны detail хэсэгрүү URL-ээр id-Г нь дамжуулан шилжинэ. */}
            <Link href={`/clothes/${clothes._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {clothes.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{clothes.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {formatPrice(clothes.price)}
        </p>
      </div>
    </div>
  );
};

export default ClothesItem;
