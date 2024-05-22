"use client";
import axios from "axios";
import { API_URL, PRODUCTION_API_URL, DB_URI } from "../config/config";
import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalContext from "./global_context";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
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
  const router = useNavigation();

  // Хэрэглэгч яг тухайн мөчид системийн feature-уудийг үзэх эрхтэй эсэхийг шалгах. нэг ёсондоо login хийсэн эсэхийг шалгах function
  const authorization = async () => {
    try {
      const token = await AsyncStorage.getItem("emp_token");

      if (!token) {
        router.navigate("Login");
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
      console.log(data.data);

      // router.push("/user");

      if (data.data.user.role === "admin") {
        setState((prev) => {
          return {
            ...prev,
            userDetail: data.data.user,
            role: data.data.user.role,
            isLogged: true,
            appBar: true,
          };
        });
        router.navigate("General");
      } else {
        await AsyncStorage.removeItem("emp_token");
        await AsyncStorage.removeItem("emp_userid");
        router.navigate("Login");
      }
      return { logged: true, user: data.data.user };
    } catch (err) {
      console.log(err);

      setState(() => {
        return {
          initialState,
        };
      });
      router.navigate("Login");
    }
  };

  const loadLoggedUser = async () => {
    try {
      const token = await AsyncStorage.getItem("emp_token");
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
          userDetail: data.data.data,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Хэрэглэгчдийг db-ээс авах function
  const loadUsers = async () => {
    const token = await AsyncStorage.getItem("emp_token");
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
        return { ...prev, users: users.data.data };
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
    await AsyncStorage.removeItem("emp_token");
    await AsyncStorage.removeItem("emp_userid");

    /* The commented out lines `// deleteCookie("emp_token");` and `// deleteCookie("emp_userid");` are
likely intended to delete cookies named "emp_token" and "emp_userid" respectively. However, in the
provided code snippet, these lines are commented out and not actually executed. */
    // deleteCookie("emp_token");
    // deleteCookie("emp_userid");
    showMessage({ message: "Системээс амжилттай гарлаа.", type: "success" });
    router.navigate("Login");
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

      await AsyncStorage.setItem("emp_token", data.data.token);
      await AsyncStorage.setItem("emp_userid", data.data.user._id);
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
      const token = await AsyncStorage.getItem("emp_token");
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
      console.log(auth.data);
      if (auth.data.user.role === "admin") {
        setState((prev) => {
          return { ...prev, myToken: auth.data.token, isLogged: true };
        });
        await AsyncStorage.setItem("emp_token", auth.data.token);
        await AsyncStorage.setItem("emp_userid", auth.data.user._id);
        showMessage({
          message: "Амжилттай нэвтэрлээ.",
          type: "success",
        });
        router.navigate("General");
      } else {
        showMessage({
          message: "Email эсвэл password буруу байна.",
          type: "error",
          position: "center",
        });
      }
    } catch (err) {
      console.log(err);
      showMessage({
        message: "Алдаа гарлаа.",
        type: "error",
        position: "center",
      });
      // toast.error("Username эсвэл Password буруу байна. Дахин оролдоно уу.");
    }
  };
  const giveFeedback = async (feedback) => {
    const token = await AsyncStorage.getItem("emp_token");
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
