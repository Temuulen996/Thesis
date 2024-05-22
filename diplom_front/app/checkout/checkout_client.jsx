"use client";

import InformationModal from "@/components/general/info_modal";
import PageLoader from "@/components/general/loader_page";
import ValidationModal from "@/components/general/validation_modal";
import ClothesContext from "@/context/clothes_context";
import GlobalContext from "@/context/global_context";
import { formatPrice } from "@/utils/format_price";
import { Button } from "@mui/material";
import { InputMask } from "primereact/inputmask";
import { getCookie } from "cookies-next";

import { TextInput } from "flowbite-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Empty } from "antd";
import { useRouter } from "next/navigation";
import EPageBanner from "@/components/general/page_banner";
import Container from "@/components/general/container";
import UserContext from "@/context/user_context";
import ESuccessModal from "@/components/general/success_modal";

const CheckoutClient = ({ userInfo }) => {
  console.log("🚀 ~ CheckoutClient ~ userInfo:", userInfo);

  const [subTotal, setSubTotal] = useState(null);
  const [amounts, setAmounts] = useState({
    total: 0,
    sub_total: 0,
    shipping: 0,
  });
  const [paymentInfo, setPaymentInfo] = useState({
    email: userInfo?.email || null,
    delivery_address: userInfo?.address || null,
    phone_number: userInfo?.phone_number || null,
    card_info: {
      card_number: null,
      firstname: null,
      lastname: null,
      date: null,
      cvv: null,
      epin: null,
    },
  });
  const [formVisibleStatus, setFormVisibleStatus] = useState({
    email: true,
    delivery_address: true,
    phone_number: true,
    card_info: true,
  });
  const clCtx = useContext(ClothesContext);
  const glCtx = useContext(GlobalContext);
  const usCtx = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    initialize();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      paymentInfo.email &&
      paymentInfo.delivery_address &&
      paymentInfo.phone_number &&
      paymentInfo.card_info.card_number &&
      paymentInfo.card_info.firstname &&
      paymentInfo.card_info.lastname &&
      paymentInfo.card_info.date &&
      paymentInfo.card_info.cvv
    ) {
      glCtx.setOpenModal(true);
    } else {
      toast.error("талбарыг бүрэн бөглөнө үү!");
    }
  };

  const calculateTotal = async () => {
    let total = 0;
    clCtx.state.cartItems?.map?.((el, i) => {
      total += el.clothes_id.price;
    });
    setAmounts((prev) => {
      return { ...prev, sub_total: total, total: total + 5000 + 6500 };
    });
  };
  const initialize = async () => {
    try {
      await usCtx.authorization();
      await calculateTotal();
      // setPaymentInfo(prev => {
      //   ...prev ,
      // })
      console.log(usCtx.state);
    } catch (err) {
      console.log(err);
    }
  };

  const Horizontal = () => {
    return <hr className="w-full  my-1 bg-white h-[3px] " />;
  };

  if (clCtx.state.cartItems.length == 0)
    return (
      <div className="w-full flex justify-center">
        <Empty description="Сагс хоосон байна!" />
      </div>
    );
  return (
    <div>
      <EPageBanner label="Төлбөр төлөх" />
      <Container>
        <div className="grid md:grid-cols-12 w-full bg-white py-4 px-2  my-4">
          <ESuccessModal component={<div>amjilttail</div>} />
          <ValidationModal
            component={
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="font-bold">Total : </p>
                  <p>{formatPrice(amounts.total)}</p>
                </div>
                <Horizontal />
                <div className="flex justify-between">
                  <p className="font-bold">email : </p>
                  <p>{paymentInfo.email}</p>
                </div>
                <div className="flex justify-between">
                  <p className="col-span-3 font-bold">Хаяг : </p>
                  <p className="col-span-9">{paymentInfo.delivery_address}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Утасны дугаар : </p>
                  <p>{paymentInfo.phone_number}</p>
                </div>
                <Horizontal />
                <div className="flex justify-between">
                  <p className="font-bold">Картын дугаар : </p>
                  <p>{paymentInfo.card_info.card_number}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Нэр : </p>
                  <p>{paymentInfo.card_info.firstname}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Овог : </p>
                  <p>{paymentInfo.card_info.lastname}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Картын хүчинтэй хугацаа : </p>
                  <p>{paymentInfo.card_info.date}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">CVV : </p>
                  <p>{paymentInfo.card_info.cvv}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">E-pin : </p>
                  <p>{paymentInfo.card_info.epin}</p>
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    color="success"
                    onClick={async () => {
                      await toast.promise(
                        clCtx.makeOrder(paymentInfo, amounts),
                        {
                          loading: "Түр хүлээнэ үү...",
                          error: "Алдаа гарлаа!",
                          success: "Захиалга амжилттай баталгаажлаа.",
                        }
                      );
                      glCtx.setSuccessModal(true);
                      setTimeout(() => {
                        glCtx.setSuccessModal(false);
                        router.push("/");
                      }, 3000);
                    }}
                  >
                    {"Төлөх"}
                  </Button>
                  <Button
                    color="error"
                    onClick={() => glCtx.setOpenModal(false)}
                  >
                    Буцах
                  </Button>
                </div>
              </div>
            }
          />

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="col-span-8 md:mr-4 mb-4 md:mb-0"
          >
            <div className="font-bold  text-2xl ml-4 ">Төлбөр төлөх</div>
            <Horizontal />
            <div className="flex justify-between px-4 my-4 ">
              <div className="grid grid-cols-1 w-[65%]">
                <div>1. Email хаяг</div>
                {!formVisibleStatus.email && <div>{paymentInfo.email}</div>}
                {formVisibleStatus.email && (
                  <div>
                    <TextInput
                      onChange={(e) => {
                        setPaymentInfo((prev) => {
                          return { ...prev, email: e.target.value };
                        });
                      }}
                      value={paymentInfo.email || null}
                      placeholder="example@gmail.com"
                      id="small"
                      type="text"
                      sizing="sm"
                    />
                    <Button
                      variant="text"
                      onClick={() => {
                        setFormVisibleStatus((prev) => {
                          return { ...prev, email: false };
                        });
                      }}
                    >
                      Болсон
                    </Button>
                  </div>
                )}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setFormVisibleStatus((prev) => {
                    return { ...prev, email: true };
                  });
                }}
              >
                Засах
              </div>
            </div>
            <Horizontal />
            <div className="flex justify-between px-4 my-4">
              <div className="grid grid-cols-1 w-[65%]">
                <div>2. Хүргэлт хүлээн авах хаяг</div>
                {!formVisibleStatus.delivery_address && (
                  <div>{paymentInfo.delivery_address}</div>
                )}
                {formVisibleStatus.delivery_address && (
                  <div>
                    <TextInput
                      onChange={(e) => {
                        setPaymentInfo((prev) => {
                          return { ...prev, delivery_address: e.target.value };
                        });
                      }}
                      value={paymentInfo.delivery_address || null}
                      placeholder="Баянгол дүүрэг 25-р хороо.."
                      id="small"
                      type="text"
                      sizing="sm"
                    />
                    <Button
                      variant="text"
                      onClick={() => {
                        setFormVisibleStatus((prev) => {
                          return { ...prev, delivery_address: false };
                        });
                      }}
                    >
                      Болсон
                    </Button>
                  </div>
                )}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setFormVisibleStatus((prev) => {
                    return { ...prev, delivery_address: true };
                  });
                }}
              >
                Засах
              </div>
            </div>
            <Horizontal />
            <div className="flex justify-between px-4 my-4">
              <div className="grid grid-cols-1 w-[65%]">
                <div>4. Утасны дугаар</div>
                {!formVisibleStatus.phone_number && (
                  <div>{paymentInfo.phone_number}</div>
                )}
                {formVisibleStatus.phone_number && (
                  <div>
                    <InputMask
                      className="w-full rounded-lg py-1 border-slate-300 bg-gray-100 text-[12px]"
                      id="ssn"
                      mask="99999999"
                      value={paymentInfo.phone_number || null}
                      onChange={(e) => {
                        setPaymentInfo((prev) => {
                          return {
                            ...prev,
                            phone_number: e.target.value,
                          };
                        });
                        console.log(e.target.value);
                      }}
                      placeholder="99999999"
                    />
                    {/* <TextInput
                  onChange={(e) => {
                    setPaymentInfo((prev) => {
                      return { ...prev, phone_number: e.target.value };
                    });
                  }}
                  placeholder="phone number.."
                  id="small"
                  type="text"
                  sizing="sm"
                /> */}
                    <Button
                      variant="text"
                      onClick={() => {
                        setFormVisibleStatus((prev) => {
                          return { ...prev, phone_number: false };
                        });
                      }}
                    >
                      Болсон
                    </Button>
                  </div>
                )}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setFormVisibleStatus((prev) => {
                    return { ...prev, phone_number: true };
                  });
                }}
              >
                Засах
              </div>
            </div>
            <Horizontal />
            <div className="flex justify-between px-4 my-4">
              <div className="grid grid-cols-1 w-[65%]">
                <div>4. Картын мэдээлэл</div>
                <div className="">
                  {!formVisibleStatus.card_info && (
                    <div className="grid grid-cols-2">
                      <h1>Дугаар: {paymentInfo.card_info.card_number}</h1>
                      <h1>Нэр: {paymentInfo.card_info.firstname}</h1>
                      <h1>Овог: {paymentInfo.card_info.lastname}</h1>
                      <h1>Он сар: {paymentInfo.card_info.date}</h1>
                      <h1>CVV: {paymentInfo.card_info.cvv}</h1>
                    </div>
                  )}
                  {formVisibleStatus.card_info && (
                    <div>
                      <div className="grid grid-cols-2 gap-2">
                        <InputMask
                          className="w-full rounded-lg py-1 border-slate-300 bg-gray-100 text-[12px]"
                          id="small"
                          mask="9999-9999-9999-9999"
                          onChange={(e) => {
                            let obj = {
                              ...paymentInfo.card_info,
                              card_number: e.target.value.replace(/-/g, ""),
                            };
                            setPaymentInfo((prev) => {
                              return { ...prev, card_info: obj };
                            });
                          }}
                          placeholder="Картын дугаар"
                        />
                        <TextInput
                          onChange={(e) => {
                            let obj = {
                              ...paymentInfo.card_info,
                              firstname: e.target.value,
                            };
                            setPaymentInfo((prev) => {
                              return { ...prev, card_info: obj };
                            });
                          }}
                          placeholder="Нэр.."
                          id="small"
                          type="text"
                          sizing="sm"
                        />
                        <TextInput
                          onChange={(e) => {
                            let obj = {
                              ...paymentInfo.card_info,
                              lastname: e.target.value,
                            };
                            setPaymentInfo((prev) => {
                              return { ...prev, card_info: obj };
                            });
                          }}
                          placeholder="Овог"
                          id="small"
                          type="text"
                          sizing="sm"
                        />

                        <InputMask
                          className="w-full rounded-lg py-1 border-slate-300 bg-gray-100 text-[12px]"
                          mask="99/99"
                          onChange={(e) => {
                            let obj = {
                              ...paymentInfo.card_info,
                              date: e.target.value,
                            };
                            setPaymentInfo((prev) => {
                              return { ...prev, card_info: obj };
                            });
                          }}
                          placeholder="Картын хүчинтэй хугацаа"
                          id="small"
                        />

                        <InputMask
                          className="w-full rounded-lg py-1 border-slate-300 bg-gray-100 text-[12px]"
                          mask="999"
                          onChange={(e) => {
                            let obj = {
                              ...paymentInfo.card_info,
                              cvv: e.target.value,
                            };
                            setPaymentInfo((prev) => {
                              return { ...prev, card_info: obj };
                            });
                          }}
                          placeholder="CVV"
                          id="small"
                        />
                        <InputMask
                          className="w-full rounded-lg py-1 border-slate-300 bg-gray-100 text-[12px]"
                          mask="9999"
                          onChange={(e) => {
                            let obj = {
                              ...paymentInfo.card_info,
                              epin: e.target.value,
                            };
                            setPaymentInfo((prev) => {
                              return { ...prev, card_info: obj };
                            });
                          }}
                          placeholder="E-pin"
                          id="small"
                        />
                      </div>

                      <Button
                        variant="text"
                        onClick={() => {
                          setFormVisibleStatus((prev) => {
                            return { ...prev, card_info: false };
                          });
                        }}
                      >
                        Болсон
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setFormVisibleStatus((prev) => {
                    return { ...prev, card_info: true };
                  });
                }}
              >
                Засах
              </div>
            </div>
            <Button
              type="submit"
              onClick={() => {}}
              variant="contained"
              color="success"
              className="bg-green-500 ml-4"
            >
              Төлбөр төлөх
            </Button>
          </form>
          <div className="col-span-4 text-white bg-slate-700 rounded-md ">
            <div className="px-4 max-h-[300px] overflow-y-scroll overflow-x-hidden mb-4">
              {clCtx.state.cartItems?.map?.((el, i) => {
                return (
                  <div
                    className="grid grid-cols-12 my-4 bg-white text-black rounded-md gap-1"
                    key={i}
                  >
                    <div className="col-span-3 ">
                      <Image
                        alt={el.clothes_id._id}
                        src={el.clothes_id.images[0]}
                        width={500}
                        height={500}
                        className="w-full h-full aspect-square object-contain"
                      />
                    </div>

                    <div className="col-span-9 p-4">
                      {" "}
                      <h1 className="font-semibold text-lg mb-2">
                        {el.clothes_id.name}
                      </h1>
                      <p className=" text-md">
                        {" "}
                        Үнэ : {formatPrice(el.clothes_id.price)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-4">
              <div className="flex justify-between">
                {" "}
                <div className="font-bold">Суурь үнэ</div>
                <div> {formatPrice(amounts.sub_total)}</div>
              </div>
              <div className="flex justify-between">
                {" "}
                <div className="font-bold">Хүргэлт</div>
                <div>{formatPrice(amounts.shipping)}</div>
              </div>
              <div className="flex justify-between">
                {" "}
                <div className="font-bold">Цэвэрлэгээ</div>
                <div>{formatPrice("6500")}</div>
              </div>
              <div className="flex justify-between">
                {" "}
                <div className="font-bold">Уут, Хайрцаг</div>
                <div>{formatPrice("5000")}</div>
              </div>
              <Horizontal />
              <div className="flex justify-between">
                {" "}
                <div className="font-bold">Нийт </div>
                <div> {formatPrice(amounts.total)}</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutClient;
