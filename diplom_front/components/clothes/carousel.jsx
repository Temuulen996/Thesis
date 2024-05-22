"use client";
import { Carousel } from "flowbite-react";
import Image from "next/image";

// Home page-ийн зураг солигддог slider-ийн component.
const CustomCarousel = ({ images }) => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={4000}>
        {images?.map?.((elem, i) => (
          <img key={i} src={elem} alt="..." />
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
