import Container from "../general/container";
import Header from "./Header";
import CustomFooter from "./footer";

const CustomLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <main className="flex-grow">
        <Container>{children}</Container>
      </main>
      <CustomFooter />
    </div>
  );
};

export default CustomLayout;
