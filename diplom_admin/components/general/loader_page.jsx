"use client";

const PageLoader = () => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center z-40 bg-white opacity-60">
      <div
        className="z-50 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(1,1,1,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
