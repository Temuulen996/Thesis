"use client";
import EBreadCrumb from "@/components/general/breadcrumb";
import Container from "@/components/general/container";
import EPageBanner from "@/components/general/page_banner";
import CustomLayout from "@/components/layouts/my_layout";
import ClothesContext from "@/context/clothes_context";
import UserContext from "@/context/user_context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

// Бидний тухай хуудас.
const AboutUsPage = () => {
  // UserContext-оос нэвтэрсэн эсэхийг шалгах
  const usCtx = useContext(UserContext);
  const clCtx = useContext(ClothesContext);
  const router = useRouter();
  useEffect(() => {
    usCtx.authorization();
    clCtx.loadCartItems();
  }, []);
  return (
    <>
      {usCtx.state.isLogged ? (
        <div className="">
          <EPageBanner label="Бидний тухай" />
          <Container>
            <div className="flex flex-col">
              <AboutUsSection
                image="/images/about_us1.png"
                title="Бидний тухай"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum."
              />
              <AboutUsSection
                image="/images/about_us2.png"
                title="Системийн тухай"
                text="EThrift систем нь хэрэглэгч өөрийн хуучин эсвэл худалдаалахыг
              хүссэн хувцасаа өөр нэгэн хэрэглэгчид худалдаалах, өөрт хэрэгтэй
              хувцасаа авах боломжийг олгоно. Мөн хэрэглэгч заавал дэлгүүрт
              биечлэн очихгүйгээр онлайнаар худалдан авалт хийх боломжтой."
              />
              <AboutUsSection
                image="/images/about_us3.png"
                title="Системийн зорилго"
                text="Дэлхий нийтэд хувцасны хог хаягдал маш их байгаа бөгөөд энэ нь байгаль орчинд сөргөөр нөлөөлж, усны хомсдолд орох том шалтгаан болж байгаа учраас хуучин хувцасны худалдаа(thrift)-г системээр дамжуулан хөгжүүлж, хувцасны хог хаягдлыг багасгах зорилготой."
              />
            </div>
          </Container>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const AboutUsSection = ({ image, text, title }) => {
  return (
    <section className="my-4">
      <div>
        <Image
          width={150000}
          height={200000}
          src={image}
          className="w-full max-h-[600px]"
          alt="..."
        />
      </div>
      <div className="font-bold text-2xl my-2">- {title}</div>
      <div className=" text-slate-700 ">{text}</div>
    </section>
  );
};
export default AboutUsPage;
