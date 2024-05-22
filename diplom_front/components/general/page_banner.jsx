import Image from "next/image";

const EPageBanner = ({ label }) => {
  return (
    <div className="relative hidden md:block">
      <Image
        width={150000}
        height={200000}
        src="/images/image.png"
        className="w-full max-h-[400px]"
        alt="..."
      />
      <div className="absolute left-1/2 top-1/2 transform font-bold -translate-x-1/2 -translate-y-1/2 text-4xl">
        {label}
      </div>
    </div>
  );
};

export default EPageBanner;
