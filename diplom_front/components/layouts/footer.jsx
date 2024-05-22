"use client";

import UserContext from "@/context/user_context";
import { Footer } from "flowbite-react";
import { useContext } from "react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const CustomFooter = () => {
  const usCtx = useContext(UserContext);
  return (
    <>
      {usCtx.state.isLogged ? (
        <Footer bgDark>
          <div className="w-full">
            <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
              <Footer.Copyright href="#" by="Ethrift™" year={2024} />
              <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                <Footer.Icon
                  href="https://www.facebook.com/profile.php?id=100008343611449"
                  icon={BsFacebook}
                />
                <Footer.Icon
                  href="https://github.com/Temuulen996"
                  icon={BsGithub}
                />
              </div>
            </div>
          </div>
        </Footer>
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomFooter;
