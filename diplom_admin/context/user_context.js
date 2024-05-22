"use client";
import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { createContext, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import GlobalContext from "./global_context";

const UserContext = createContext();
const initialState = {
  isLogged: false,
  myToken: null,
  appBar: null,
  role: "user",
  users: [],
  userDetail: null,
  ordersCurrentUser: null,
};
export function UserWrapper({ children }) {
  const [state, setState] = useState(initialState);
  const glCtx = useContext(GlobalContext);
  const router = useRouter();
  const pathname = usePathname();

  // Хэрэглэгч яг тухайн мөчид системийн feature-уудийг үзэх эрхтэй эсэхийг шалгах. нэг ёсондоо login хийсэн эсэхийг шалгах function
  const authorization = async () => {
    console.log(pathname);
    const token = getCookie("admin_token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      const data = await axios.get(
        `${process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.API_URL
        }/check`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setState((prev) => {
        return {
          ...prev,
          userDetail: data?.data?.user,
          role: data?.data?.user?.role,
          isLogged: true,
          appBar: true,
        };
      });
      // if (data.data.user.role === "admin") {
      //   router.push("/admin");
      // }
      return { logged: true, user: data?.data?.user };
    } catch (err) {
      console.log(err);

      setState(() => {
        return {
          initialState,
        };
      });
      router.push("/login");
    }
  };

  const loadLoggedUser = async () => {
    try {
      const data = await axios.get(
        `${process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.API_URL
        }/api/user/logged_user`,
        {
          headers: { Authorization: `Bearer ${getCookie("admin_token")}` },
        }
      );

      setState((prev) => {
        return {
          ...prev,
          userDetail: data?.data?.data,
        };
      });
      // if (data.data.user.role === "admin") {
      //   router.push("/admin");
      // }
    } catch (err) {
      console.log(err);
    }
  };
  // Хэрэглэгчдийг db-ээс авах function
  const loadUsers = async () => {
    const token = getCookie("admin_token");
    try {
      const users = await axios.get(
        `${process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.API_URL
        }/api/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setState((prev) => {
        return { ...prev, users: users?.data?.data };
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Logout хийх function
  const logOut = () => {
    setState((prev) => {
      return { initialState };
    });

    deleteCookie("admin_token");
    deleteCookie("userid");

    router.push("/login");
  };

  // Хэрэглэгчийн бүртгэл үүсгэх function
  const signUp = async (fname, lname, email, password) => {
    try {
      const data = await axios.post(
        `${process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.API_URL
        }/api/user`,
        {
          fname,
          lname,
          email,
          password,
        }
      );

      setCookie("admin_token", data.data.token);
      setCookie("userid", data?.data?.user?._id);
    } catch (err) {
      console.log(err);
    }
  };
  const loadOrdersByUser = async () => {
    try {
      const data = await axios.get(
        `${process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.API_URL
        }/api/order/user`,
        {
          headers: { Authorization: `Bearer ${getCookie("admin_token")}` },
        }
      );
      console.log(data);
      setState((prev) => {
        return { ...prev, ordersCurrentUser: data?.data?.data };
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Хэрэглэгчийн бүртгэлээр нэвтрэх function
  const login = async (password, email) => {
    console.log(password);
    try {
      const auth = await axios.post(
        `${process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.API_URL
        }/api/user/login`,
        {
          email: email,
          password: password,
        }
      );
      setState((prev) => {
        return { ...prev, myToken: auth?.data?.token, isLogged: true };
      });
      if (auth?.data?.user?.role === "admin") {
        setCookie("admin_token", auth?.data?.token);
        setCookie("userid", auth?.data?.user?._id);
        toast.success("Амжилттай нэвтэрлээ.");
        router.push("/admin");
      }
      else toast.error("Username эсвэл Password буруу байна. Дахин оролдоно уу.");
      glCtx.setLoadingReq(false);
    } catch (err) {
      console.log(err);
      toast.error("Username эсвэл Password буруу байна. Дахин оролдоно уу.");
    }
  };
  return (
    <UserContext.Provider
      value={{
        login,
        loadOrdersByUser,
        logOut,
        state,
        authorization,
        loadLoggedUser,
        loadUsers,

        signUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default UserContext;
