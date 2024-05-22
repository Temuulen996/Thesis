"use client";
import Container from "@/components/general/container";
import ClothesContext from "@/context/clothes_context";
import UserContext from "@/context/user_context";
import { formatPrice } from "@/utils/format_price";
import Image from "next/image";
import { use, useContext, useEffect, useState } from "react";
import ProfileSummary from "./profile_summary";
import ProfileForm from "./profile_form";
import GlobalContext from "@/context/global_context";
import Stack from "@mui/material/Stack";
import CountUp from "react-countup";
import { formatDate } from "@/utils/format_date";
import { Descriptions, Divider } from "antd";
import ValidationModal from "@/components/general/validation_modal";
import { Carousel } from "antd";
import { FormatStatus } from "@/utils/format_status";

export default () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const usCtx = useContext(UserContext);
  const clCtx = useContext(ClothesContext);
  const glCtx = useContext(GlobalContext);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    glCtx.setLoadingReq(true);
    try {
      await usCtx.authorization();
      await usCtx.loadOrdersByUser();
      await usCtx.loadLoggedUser();
      await clCtx.loadCartItems();
      console.log(usCtx.state);
      glCtx.setLoadingReq(false);
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };

  const Horizontal = () => {
    return <hr className="w-full  my-1 bg-white h-[3px] " />;
  };

  const items = [
    {
      key: "1",
      label: "Email хаяг",
      children: usCtx.state.userDetail?.email,
    },
    {
      key: "2",
      label: "Утасны дугаар",
      children: usCtx.state.userDetail?.phone_number,
    },
    {
      key: "3",
      label: "Нэр",
      children: usCtx.state.userDetail?.fname,
    },
    {
      key: "4",
      label: "Овог",
      children: usCtx.state.userDetail?.lname,
    },
    {
      key: "5",
      label: "Гэрийн хаяг",
      children: usCtx.state.userDetail?.address,
    },
  ];
  return (
    <Container>
      <div className="my-4  rounded-md ">
        <ValidationModal
          component={
            <div className="flex flex-col">
              <div>
                <Carousel
                  afterChange={() => {
                    console.log("object");
                  }}
                >
                  {selectedOrder?.items?.map?.((el, i) => {
                    return (
                      <div className=" " key={i}>
                        <Image
                          className="m-0 h-[210px] bg-[#364d79] text-[#fff] object-cover"
                          src={el?.images[0]}
                          width={500}
                          height={500}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              <Divider dashed />
              <div className="w-full ">
                <div className="w-full flex flex-row justify-between">
                  <div>Захиалгын дугаар:</div>
                  <div className="font-bold">{selectedOrder?._id}</div>
                </div>
                <div className="w-full flex flex-row justify-between">
                  <div>Огноо:</div>
                  <div className="font-bold">
                    {formatDate(selectedOrder?.date)}
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between">
                  <div>Суурь үнэ:</div>
                  <div className="font-bold">
                    {formatPrice(selectedOrder?.payment?.sub_total)}
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between">
                  <div>Нийт үнэ:</div>
                  <div className="font-bold">
                    {formatPrice(selectedOrder?.payment?.total)}
                  </div>
                </div>
              </div>
              <Divider dashed />
              <div className="w-full flex flex-row justify-between">
                <div>
                  {selectedOrder?.status === "Pending"
                    ? "Хүргэгдэх огноо:"
                    : "Хүргэгдсэн огноо:"}
                </div>
                <div className="font-bold">
                  {formatDate(selectedOrder?.estimated_date)}
                </div>
              </div>
            </div>
          }
        />
        <h1 className="w-full text-center font-bold text-4xl text-black pt-4">
          Хэрэглэгчийн хуудас
        </h1>
        <Horizontal />
        <div className="grid grid-cols-12 py-4 px-4 gap-2">
          <div className="col-span-12 border-b-[1.5px] border-slate-300 pb-4">
            <ProfileSummary orders={usCtx.state.ordersCurrentUser} />
          </div>
          <div className="col-span-12 border-b-[1.5px] border-slate-300">
            <Descriptions
              userInfo={usCtx.state.userDetail}
              title="Хэрэглэгчийн мэдээлэл"
              items={items}
            />
          </div>
          <div className="col-span-12 md:col-span-6 border-r-[1.5px] border-slate-300 ">
            <ProfileForm userInfo={usCtx.state.userDetail} />
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="px-4 max-h-[300px] overflow-y-scroll overflow-x-hidden mb-4">
              <Stack spacing={1}>
                {usCtx.state.ordersCurrentUser?.map?.((el, i) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedOrder(el);
                        glCtx.setOpenModal(true);
                      }}
                      className="grid grid-cols-12 my-2 bg-slate-700 shadow-xl rounded-md gap-1 cursor-pointer hover:scale-95 duration-100"
                      key={i}
                    >
                      {el.items[0] && (
                        <div className="col-span-3 ">
                          <Image
                            alt={el.items[0]?._id}
                            src={el.items[0]?.images[0]}
                            width={500}
                            height={500}
                            className="w-full h-full aspect-square object-cover rounded-l-md"
                          />
                        </div>
                      )}

                      <div className="col-span-9 p-4">
                        <h1 className="font-semibold text-white text-lg mb-2">
                          {FormatStatus(el?.status)}
                        </h1>
                        <div className="text-md text-white flex justify-between">
                          <p>Нийт :</p>
                          <p className="font-bold">
                            {formatPrice(el?.payment?.total)}
                          </p>
                        </div>
                        <div className=" text-md   text-white flex justify-between">
                          <p>Захиалсан :</p>
                          <p className="font-bold">{formatDate(el?.date)}</p>
                        </div>
                        <div className=" text-md  text-white flex justify-between">
                          <p>Хүргэгдэх :</p>
                          <p className="font-bold">
                            {formatDate(el?.estimated_date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
