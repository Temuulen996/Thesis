"use client";
import GlobalLoader from "@/components/general/loader";
import PageLoader from "@/components/general/loader_page";
import { AdminProvider } from "@/context/admin_context";
import { ClothesWrapper } from "@/context/clothes_context";
import { GlobalProvider } from "@/context/global_context";
import { UserWrapper } from "@/context/user_context";
import { ChakraProvider } from "@chakra-ui/react";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  return (
    <ChakraProvider>
      <GlobalProvider>
        <UserWrapper>
          <AdminProvider>
            <ClothesWrapper>
              <Toaster
                toastOptions={{
                  style: { background: "rgb(51 65 85)", color: "#fff" },
                  position: "bottom-left",
                }}
              />
              {/* <Toaster position="bottom-right" /> */}
              <Suspense fallback={<PageLoader />}>
                <GlobalLoader />
                {children}
              </Suspense>
            </ClothesWrapper>
          </AdminProvider>
        </UserWrapper>
      </GlobalProvider>
    </ChakraProvider>
  );
};

export default Providers;
