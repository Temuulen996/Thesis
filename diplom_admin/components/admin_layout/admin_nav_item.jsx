import { Icon } from "@mui/material";

const AdminNavItem = ({ selected, icon, label }) => {
  return (
    <div
      className={`flex items-center justify-normal text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${
        selected
          ? "border-b-slate-800 text-slate-800"
          : "border-transparent text-slate-500"
      }`}
    >
      {icon}
      <div className="font-medium text-sm text-center break-normal ">
        {label}
      </div>
    </div>
  );
};

export default AdminNavItem;
