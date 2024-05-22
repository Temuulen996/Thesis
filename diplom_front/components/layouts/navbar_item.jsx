import Link from "next/link";

const NavbarItem = ({ selected, label, href }) => {
  return (
    <Link href={href}>
      <div
        className={`${
          selected
            ? "text-white border-b-[2.5px]  border-white "
            : "text-slate-300"
        } hover:text-slate-200  font-semibold before:border-b-0 duration-150 after:border-b-[2.5px]`}
      >
        {label}
      </div>
    </Link>
  );
};

export default NavbarItem;
