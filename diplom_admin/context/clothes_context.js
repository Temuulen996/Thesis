"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import GlobalContext from "./global_context";
const ClothesContext = createContext();
const initialState = {
  clothes: null,
  cartItems: null,
  newClothes: null,
  categories: null,
  orders: null,
  cartTotal: 0,
};
export function ClothesWrapper({ children }) {
  const [state, setState] = useState(initialState);
  const glCtx = useContext(GlobalContext);
  const loadOrders = async () => {
    console.log("ajillaaa");
    const token = getCookie("admin_token");
    try {
      const data = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/order`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setState((prev) => {
        return { ...prev, orders: data?.data?.data };
      });
    } catch (err) {
      console.log(err);
    }
  };
  const loadCategories = async () => {
    const token = getCookie("admin_token");
    try {
      const data = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/category`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setState((prev) => {
        return { ...prev, categories: data?.data?.data };
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Сагсанд байгаа хувцаснуудын data-г db-ээс татан авчрах function.
  const loadCartItems = async () => {
    const token = getCookie("admin_token");
    axios
      .get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/cart_item/owner`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setState((prev) => {
          return {
            ...prev,
            cartItems: res?.data?.data,
            cartTotal: res?.data?.countOfCartItem,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Сагсанд байгаа хувцаснуудыг бүгдийг нь db-ээс устгах function.
  const removeAllFromCart = async () => {
    const token = getCookie("admin_token");

    axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/cart_item/remove_all`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setState((prev) => {
          return { ...prev, cartItems: [] };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Нэг барааг сагснаас хасах function.
  const removeFromCart = async (id) => {
    let array = state.cartItems;
    let index = array.findIndex((el) => el._id === id);
    if (index !== -1) {
      array.splice(index, 1);
    }
    setState((prev) => {
      return { ...prev, cartItems: array, cartTotal: prev.cartTotal - 1 };
    });

    const token = getCookie("admin_token");

    axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/cart_item/remove`,
        {
          id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // Сагсанд хувцас нэмэх function.
  const addToCart = async (clothes_id) => {
    const token = getCookie("admin_token");
    axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/cart_item`,
        {
          clothes_id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        setState((prev) => {
          return {
            ...prev,
            cartItems: res?.data?.data,
            cartTotal: res?.data?.countOfCartItem,
          };
        });
        toast.success("Сагсруу амжилттай нэмэгдлээ..");
      })
      .catch((err) => {
        toast.error("Алдаа гарлаа.");
        console.log(err);
      });
  };
  const filterClothes = async (
    price_from,
    price_to,
    by_string,
    sizes,
    categories,
    gender
  ) => {
    const token = getCookie("admin_token");
    try {
      const clothes = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/clothes/filter?by_string=${by_string}&price_from=${price_from}&price_to=${price_to}&sizes=${sizes}&categories=${categories}&gender=${gender}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setState((prev) => {
        return { ...prev, clothes: clothes?.data?.data };
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Бүх хувцасны data-г db-ээс татан авчрах function.
  const loadClothes = async () => {
    const token = getCookie("admin_token");
    try {
      const clothes = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/clothes?page=${1}&limit=12`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setState((prev) => {
        return { ...prev, clothes: clothes?.data?.data?.reverse() };
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Шинээр нэмэгдсэн хувцасны data-г db-ээс татан авчрах function.
  const loadNewItems = async () => {
    const token = getCookie("admin_token");
    try {
      const clothes = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/clothes/new_clothes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setState((prev) => {
        return { ...prev, newClothes: clothes?.data?.data };
      });
    } catch (err) {
      console.log(err);
    }
  };
  const makeOrder = async (paymentInfo, amounts) => {
    glCtx.setOpenModal(true);
    const token = getCookie("admin_token");
    try {
      const res = await axios.post(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/order`,
        {
          ...paymentInfo,
          items: state.cartItems,
          amounts: amounts,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Амжилттай төлбөр төлөгдлөө.");
      glCtx.setOpenModal(false);
    } catch (err) {
      console.log(err);
      glCtx.setOpenModal(false);
    }

    // await store();
  };
  return (
    <ClothesContext.Provider
      value={{
        loadOrders,
        makeOrder,
        loadClothes,
        loadCartItems,
        state,
        setState,
        addToCart,
        removeFromCart,
        removeAllFromCart,

        loadNewItems,
        filterClothes,
        loadCategories,
      }}
    >
      {children}
    </ClothesContext.Provider>
  );
}
export default ClothesContext;
