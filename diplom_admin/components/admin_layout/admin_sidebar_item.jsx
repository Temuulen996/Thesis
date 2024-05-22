import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

const AdminSideBarItem = ({ selected, icon, label }) => {
  return (
    <ListItem button className={`mt-2 ${selected && "bg-slate-500 "}`}>
      <ListItemIcon>
        {icon}
        {/* <DashboardIcon className="text-white" /> */}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
};

export default AdminSideBarItem;
