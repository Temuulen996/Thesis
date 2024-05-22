"use client";
import axios from "axios";
import { API_URL, PRODUCTION_API_URL, DB_URI } from "../config/config";
import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalContext from "./global_context";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { showMessage } from "react-native-flash-message";
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

  // Хэрэглэгч яг тухайн мөчид системийн feature-уудийг үзэх эрхтэй эсэхийг шалгах. нэг ёсондоо login хийсэн эсэхийг шалгах function
  const authorization = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        router.replace("/guest/login");
        return;
      }
      const data = await axios.get(
        `${
          process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
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
      // router.push("/user");

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
      router.push("/guest/login");
    }
  };

  const loadLoggedUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = await axios.get(
        `${
          process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
        }/api/user/logged_user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setState((prev) => {
        return {
          ...prev,
          userDetail: data?.data?.data,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Хэрэглэгчдийг db-ээс авах function
  const loadUsers = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const users = await axios.get(
        `${
          process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
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
  const logOut = async () => {
    setState((prev) => {
      return { initialState };
    });
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userid");
    router.replace("/guest/login");
    // deleteCookie("token");
    // deleteCookie("userid");
    showMessage({ message: "Системээс амжилттай гарлаа.", type: "success" });
    router.push("/login");
  };

  // Хэрэглэгчийн бүртгэл үүсгэх function
  const signUp = async (fname, lname, email, password) => {
    try {
      if (!fname || !lname || !email || !password) {
        showMessage({ message: "Талбарыг бүрэн бөглөнө үү!", type: "warning" });
        return;
      }

      const data = await axios.post(
        `${
          process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
        }/api/user`,
        {
          fname,
          lname,
          email,
          password,
        }
      );

      await AsyncStorage.setItem("token", data?.data?.token);
      await AsyncStorage.setItem("userid", data?.data?.user?._id);
      showMessage({ message: "Амжилттай бүртгэлээ.", type: "success" });
      router.replace("/user");
    } catch (err) {
      if (err.code == 11000)
        showMessage({ message: "Бүртгэлтэй хэрэглэгч байна.", type: "error" });
      else showMessage({ message: "Амжилтгүй боллоо.", type: "error" });
    }
  };
  const loadOrdersByUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = await axios.get(
        `${
          process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
        }/api/order/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setState((prev) => {
        return { ...prev, ordersCurrentUser: data?.data?.data };
      });
      console.log(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Хэрэглэгчийн бүртгэлээр нэвтрэх function
  const login = async (password, email) => {
    // glCtx.setLoadingReq(true);

    try {
      const auth = await axios.post(
        `${
          process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
        }/api/user/login`,
        {
          email: email,
          password: password,
        }
      );
      if (auth?.data?.user?.role === "user") {
        setState((prev) => {
          return { ...prev, myToken: auth?.data?.token, isLogged: true };
        });
        await AsyncStorage.setItem("token", auth?.data?.token);
        await AsyncStorage.setItem("userid", auth?.data?.user?._id);

        // glCtx.setLoadingReq(false);
        // toast.success("Амжилттай нэвтэрлээ.");
        // Toast.show({
        //   type: "success",
        //   text1: "Амжилттай нэвтэрлээ.",
        // });
        showMessage({
          message: "Амжилттай нэвтэрлээ.",
          type: "success",
        });
        router.replace("/user");
      } else {
        showMessage({
          message: "Email эсвэл password буруу байна.",
          type: "error",
          position: "center",
        });
      }
    } catch (err) {
      // glCtx.setLoadingReq(false);

      console.log(err);
      showMessage({
        message: "Email эсвэл password буруу байна.",
        type: "error",
        position: "center",
      });
      // toast.error("Username эсвэл Password буруу байна. Дахин оролдоно уу.");
    }
  };
  const giveFeedback = async (feedback) => {
    const token = await AsyncStorage.getItem("token");
    await axios.post(
      `${
        process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
      }/api/feedback`,
      {
        feedback,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
        giveFeedback,
        signUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default UserContext;
