"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useContext, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useParams } from "next/navigation";
import UserContext from "@/context/user_context";
import ClothesContext from "@/context/clothes_context";
import GlobalContext from "@/context/global_context";
import PageLoader from "@/components/general/loader_page";
import { Rating } from "@mui/material";
import CustomLayout from "@/components/layouts/my_layout";
import CustomCarousel from "@/components/clothes/carousel";
import { formatPrice } from "@/utils/format_price";
import ClothingDetails from "@/components/clothes/clothing_details";
import EBreadCrumb from "@/components/general/breadcrumb";
import Container from "@/components/general/container";

//нэг хувцасны мэдээллийг дэлгэрэнгүй харуулах хуудас ба URL-дээр хувцасны id-г дамжуулан өгч үүнийг ашиглан useeffect дээр id-аар тухайн хувцасны мэдээллийг харуулж байна.
export default () => {
  const [inCart, setInCart] = useState(false);

  const [clothes, setClothes] = useState(null);
  const params = useParams();
  const usCtx = useContext(UserContext);
  const clCtx = useContext(ClothesContext);
  const glCtx = useContext(GlobalContext);
  useEffect(() => {
    const token = getCookie("token");

    usCtx.authorization();
    clCtx.loadCartItems();
    axios
      .get(
        `${process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.API_URL
        }/api/clothes/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        return res.data.data;
      })
      .then((data) => {
        setClothes(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { });
    axios
      .get(
        `${process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_API_URL
          : process.env.API_URL
        }/api/cart_item/in_cart/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data.inCart);
        setInCart(res.data.inCart);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!clothes) return <PageLoader />;
  return (
    <>
      {usCtx.state.isLogged ? (
        <>
          <div>
            <EBreadCrumb clothesName={clothes?.name} page="details" />

            <Container>
              <ClothingDetails
                inCart={inCart}
                setInCart={setInCart}
                clothing={clothes}
              />
            </Container>
          </div>

          {/* <div className="">
            <div className="pt-6">

              <div className="max-w-2xl mx-auto mt-6 sm:px-6 lg:grid lg:max-w-7xl lg:px-8">
                <CustomCarousel clothes={clothes.images} />

              </div>


              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {clothes.name}
                  </h1>
                </div>


                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Clothes information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    {formatPrice(clothes.price)}
                  </p>

                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Rating
                          readOnly
                          name="customized-10"
                          defaultValue={Math.ceil(clothes.rating / 10)}
                          max={10}
                        />
                      </div>
                    </div>
                  </div>

                  <form className="mt-10">

                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Хүйс
                      </h3>

                      <RadioGroup className="mt-4">
                        <div className="flex items-center space-x-3 font-mono text-xl">

                          {clothes.gender == "M"
                            ? "*Эрэгтэй загвар"
                            : "*Эмэгтэй загвар"}
                        </div>
                      </RadioGroup>
                    </div>


                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Хэмжээ
                        </h3>
                      </div>

                      <RadioGroup className="mt-4">
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          <RadioGroup.Option
                            value={clothes.size}
                            className="relative flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-900 uppercase bg-white border rounded-md shadow-sm cursor-pointer group focus:outline-none sm:flex-1 sm:py-6"
                          >
                            {clothes.size}
                          </RadioGroup.Option>
                        </div>
                      </RadioGroup>
                    </div>

                    {!inCart ? (
                      <button
                        onClick={() => {
                          clCtx.addToCart(params.id, setInCart);
                        }}
                        type="button"
                        className="flex items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Сагс руу нэмэх
                      </button>
                    ) : (
                      <div className="text-3xl text-green-500">
                        Уучлаарай энэ хувцас сагслагдсан байгаа учраас худалдан
                        авах боломжгүй...
                      </div>
                    )}
                  </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">

                  <div>
                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {clothes.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900 ">
                      Хэрэглэсэн сар
                    </h3>

                    <div className="mt-4">
                      <ul
                        role="list"
                        className="space-y-2 font-mono text-xl list-disc"
                      >
                        {!clothes.used_month
                          ? "Мэдээлэл байхгүй байна.."
                          : `*${clothes.used_month} сар`}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">Төлөв</h2>

                    <div className="mt-4 space-y-6">
                      <p className="font-mono text-xl text-gray-600 ">
                        {"*"}
                        {clothes.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};
