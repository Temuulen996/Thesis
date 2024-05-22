const Container = ({ children }) => {
  return (
    <div className=" w-full max-w-[1920px] xl:px-20 md:px-2 px-4 mb-16">
      {children}
    </div>
  );
};

export default Container;