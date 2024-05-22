import { useContext, useEffect, useState } from "react";
import ClothesContext from "@/context/clothes_context";
import Link from "next/link";
import { formatPrice } from "@/utils/format_price";

const ShoppingCart = () => {
  const [subTotal, setSubTotal] = useState(null);
  const clCtx = useContext(ClothesContext);
  useEffect(() => {
    calculateSubTotal();
  }, [clCtx.state.cartItems]);

  const calculateSubTotal = () => {
    console.log(clCtx.state.cartItems);
    let subTotal = clCtx.state.cartItems?.reduce?.((acc, elem) => {
      if (elem.clothes_id.price) {
        return acc + elem.clothes_id.price;
      } else return acc;
    }, 0);
    setSubTotal(subTotal);
  };
  return (
    <div className="flex  flex-col  bg-white z-50 h-screen">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <p className="text-lg font-medium text-gray-900">Сагс</p>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {clCtx.state.cartItems?.map?.((clothing, i) => (
                <li key={i} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt=""
                      src={clothing?.clothes_id?.images[0]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="text-xl font-bold">
                          <a href={clothing.href}>
                            {clothing?.clothes_id?.name}
                          </a>
                        </h3>
                        <p className="ml-4 text-xl ">
                          {clothing?.clothes_id?.price.toLocaleString("en-US")}{" "}
                          ₮
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {clothing?.clothes_id?.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-md">
                      <div className="flex">
                        <button
                          onClick={() => {
                            clCtx.removeFromCart(clothing?._id);
                          }}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Хасах
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Суурь үнэ</p>
          <p>{formatPrice(subTotal)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Хүргэлт болон нэмэлт төлбөр checkout хэсэгт бодогдоно.
        </p>
        <span className="mt-6">
          <Link href="/checkout">
            <div
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent  bg-slate-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-80 transition"
            >
              Төлбөр төлөх
            </div>
          </Link>
        </span>
      </div>
    </div>
  );
};
export default ShoppingCart;
