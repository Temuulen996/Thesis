import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const EBreadCrumb = ({ clothesName, page = null }) => {
  const router = useRouter();
  const pathname = usePathname();

  const pathnames = pathname.split("/").filter((x) => x);
  if (page == "details") pathnames[1] = clothesName;
  return (
    <Breadcrumbs
      className="bg-[#F9F1E7] py-6 px-5 "
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      {/* <Link href="/" passHref>
        <Typography color="text.primary">Home</Typography>
      </Link> */}
      {pathnames.map((value, index) => {

        if (value === "about_us") value = "Бидний тухай";
        if (value === "shop") value = "Дэлгүүр";
        if (value === "clothes") value = "Хувцасны дэлгэрэнгүй";
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography className="font-bold text-slate-600" key={to}>
            | {value}
          </Typography>
        ) : (
          <div key={to}>
            <Typography className=" font-bold text-slate-700">
              {value}
            </Typography>
          </div>
        );
      })}
    </Breadcrumbs>
  );
};

export default EBreadCrumb;
