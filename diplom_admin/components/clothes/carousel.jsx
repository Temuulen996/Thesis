"use client";
import { Carousel } from "flowbite-react";
import Image from "next/image";

// Home page-ийн зураг солигддог slider-ийн component.
const CustomCarousel = ({ clothes }) => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={4000}>
        {clothes?.map?.((elem, i) => (
          <Image
            className="object-contain w-full h-full"
            width={500}
            height={500}
            key={i}
            src={elem}
            alt="..."
          />
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
