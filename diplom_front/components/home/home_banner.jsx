import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="relative mb-8 bg-gradient-to-r from-sky-500 to-sky-700 hidden md:block">
      <div className="flex flex-col items-center gap-2 px-8 py-5 mx-auto md:flex-row justify-evenly ">
        <div className="mb-8 text-center md:mb-0">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Байгаль орчноо хамгаалцгаая
          </h1>
          <p className="text-lg text-white md:text-xl">
            Сонирхсон хувцсаа хямд үнээр аваарай!
          </p>
          <p className="text-2xl font-bold text-yellow-400 md:text-5xl">
            Ethrift Mongolia
          </p>
        </div>
        <div className="relative w-1/3 aspect-video ">
          <Image
            src="/images/banner-image2.png"
            fill
            alt="banner image"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
