"use client";
import Filters from "@/components/Filters";
import ClothesContext from "@/context/clothes_context";
import UserContext from "@/context/user_context";
import { Box, Fab, Pagination } from "@mui/material";
import {
  usePathname,
  useRouter as Navigationn,
  useSearchParams,
} from "next/navigation";
import { useContext, useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useRouter } from "next/router";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ClothesItem from "@/components/clothes/clothes_item";
import CustomLayout from "@/components/layouts/my_layout";
import GlobalContext from "@/context/global_context";

import HomeBanner from "@/components/home/home_banner";
import { Empty } from "antd";
import queryString from "query-string";
import EBreadCrumb from "@/components/general/breadcrumb";
import Container from "@/components/general/container";
// Дэлгүүр хуудас.

export default (props) => {
  const [isFilterOpen, setIsFilterOpen] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [filtered, setFiltered] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [url, setUrl] = useState();
  const clCtx = useContext(ClothesContext);
  const usCtx = useContext(UserContext);
  const glCtx = useContext(GlobalContext);
  const path = usePathname();

  const searchParams = useSearchParams();

  console.log(searchParams);
  useEffect(() => {
    init();

    const asd = queryString.parse(location.search);
    console.log("asd");
  }, []);
  // useEffect(() => {
  //   fetchClothes();
  // }, []);

  const init = async () => {
    try {
      glCtx.setLoadingReq(true);
      await usCtx.authorization();
      clCtx.loadCartItems();
      clCtx.loadCategories();
      usCtx.loadUsers();

      fetch(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/clothes?page=${page}&limit=12`
      )
        .then((res) => res.json())
        .then((data) => {
          clCtx.setState((prev) => {
            return {
              ...prev,
              clothes: data.data,
              filterMaxPrice: data.maxPrice,
              filterMinPrice: data.minPrice,
            };
          });
          console.log(data);
        })
        .finally(() => {
          glCtx.setLoadingReq(false);
        });
      glCtx.setLoadingReq(false);
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };
  useEffect(() => {
    fetch(`${process.env.API_URL}/api/clothes?page=${page}&limit=12`)
      .then((res) => res.json())
      .then((data) => {
        clCtx.setState((prev) => {
          return { ...prev, clothes: data.data };
        });
        console.log(data);
        setTotalPages(data.totalPages);
      });
  }, [page]);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsFilterOpen({ ...isFilterOpen, [anchor]: open });
  };
  const filter = (anchor) => (
    <Box
      className="z-40 bg-[#D9D9D9]  h-screen"
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 300,
        zIndex: 10,
      }}
      role="presentation"
    >
      <Filters
        page={page}
        setTotalPages={setTotalPages}
        setFiltered={setFiltered}
      />
    </Box>
  );

  return (
    <>
      {usCtx.state.isLogged ? (
        <div>
          <HomeBanner />
          <Container>
            <div className="fixed bottom-20 right-10 z-50 ">
              <Fab
                className="bg-colorpurple"
                size="small"
                color="secondary"
                aria-label="add"
                onClick={toggleDrawer("left", true)}
              >
                <FilterAltIcon />
              </Fab>
            </div>
            <div className=" w-full px-4 flex flex-col">
              <div className="flex flex-col md:flex-col -mx-4 ">
                {/* filter хийх хэсгийн Component. */}
                <div className="relative md:w-1/3 lg:w-1/4 ">
                  <SwipeableDrawer
                    anchor={"left"}
                    open={isFilterOpen["left"]}
                    onClose={toggleDrawer("left", false)}
                    onOpen={toggleDrawer("left", true)}
                  >
                    {filter("left")}
                  </SwipeableDrawer>
                </div>
                <main className="w-full px-3">
                  <div className="">
                    <div className="mx-auto w-full   ">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Хувцасны жагсаалт
                      </h2>

                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                        {clCtx.state?.clothes?.map?.((clothes, i) => (
                          <ClothesItem clothes={clothes} key={i} />
                        ))}
                      </div>
                    </div>

                    {clCtx.state.clothes ? (
                      !filtered && (
                        <div className="w-full flex justify-center mt-4">
                          <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                          />
                        </div>
                      )
                    ) : (
                      <div>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
                      </div>
                    )}
                  </div>
                </main>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
