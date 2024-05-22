"use client";

import { Icon } from "@mui/material";
const Button = ({ label, disabled, outline, small, custom, Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 ${
        outline ? "bg-white" : "bg-slate-700"
      }  ${outline ? "text-slate-700" : "text-white"} ${
        small ? "text-sm font-bold" : "text-md font-semibold"
      } ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"} ${
        custom ? custom : ""
      }`}
    >
      {Icon && <Icon size={24} />}
      {label}
    </div>
  );
};

export default Button;
