"use client";

import Image from "next/image";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
const ClothingDetailImage = ({ clothing }) => {
  const [selectedImg, setSelectedImg] = useState(clothing?.images[0]);
  const handleImageSelect = (image) => {
    setSelectedImg(image);
  };
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {clothing?.images?.map?.((image, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                handleImageSelect(image);
              }}
              className={`relative w-[80%] aspect-square rounded border-teal-300 ${
                image === selectedImg ? "border-[1.5px]" : " order-none"
              }`}
            >
              <Image src={image} fill className="object-contain" />
            </div>
          );
        })}
      </div>
      <div className="col-span-5 relative aspect-square">
        <Zoom>
          <Image
            src={selectedImg}
            fill
            className="h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
          />
        </Zoom>
      </div>
    </div>
  );
};

export default ClothingDetailImage;
