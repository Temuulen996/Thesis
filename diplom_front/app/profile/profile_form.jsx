import { Button, TextField } from "@mui/material";
import { TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import GlobalContext from "@/context/global_context";
import { InputMask } from "primereact/inputmask";
const ProfileForm = ({ userInfo }) => {
  const [formDisable, setFormDisable] = useState({
    fname: true,
    lname: true,
    password: true,
  });
  const glCtx = useContext(GlobalContext);
  const prevPassword = userInfo?.password;
  const [password, setPassword] = useState(null);
  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  useEffect(() => {
    setPassword(userInfo?.password || "");
    setAddress(userInfo?.address || "");
    setPhoneNumber(userInfo?.phone_number || "");
  }, [userInfo]);
  const updateInfo = async () => {
    // if (prevPassword === password) {
    //   toast.error("Хуучин password-той ижил байна.");
    //   return;
    // }
    glCtx.setLoadingReq(true);
    try {
      const data = await axios.post(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/user/update_user_info`,
        { password, address, phoneNumber },
        {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      );
      glCtx.setLoadingReq(false);
      toast.success("Мэдээлэл амжилттай солигдлоо.");
    } catch (err) {
      console.log(err);
      toast.error("Амжилтгүй боллоо.");
      glCtx.setLoadingReq(false);
    }
  };

  return (
    <div className="mr-4 grid grid-cols-1 gap-3">
      <div className="grid grid-cols-12">
        <TextInput
          className="col-span-12"
          placeholder={userInfo?.fname}
          disabled
          id="small"
          type="text"
          sizing="sm"
        />
      </div>
      <div className="grid grid-cols-12">
        <TextInput
          className="col-span-12"
          placeholder={userInfo?.lname}
          disabled
          id="small"
          type="text"
          sizing="sm"
        />
      </div>
      <div className="grid grid-cols-12">
        <TextInput
          className="col-span-12"
          placeholder={userInfo?.email}
          disabled
          id="small"
          type="text"
          sizing="sm"
        />
      </div>
      <div className="grid grid-cols-12">
        <InputMask
          className="col-span-12 rounded-lg py-1 border-slate-300 bg-gray-100 text-[12px]"
          id="ssn"
          mask="99999999"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          placeholder={`${
            userInfo?.phone_number || "Утасны дугаараа оруулна уу"
          }`}
        />
      </div>
      <div className="grid grid-cols-12">
        <TextInput
          className="col-span-12"
          placeholder={`${userInfo?.address || "Хүргэлтийн хаягаа оруулна уу"}`}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
          id="small"
          type="text"
          sizing="sm"
        />
      </div>
      <div className="grid grid-cols-12 gap-2">
        <TextInput
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="col-span-8"
          value={password}
          disabled={formDisable.password}
          id="small"
          type={`${formDisable.password == true ? `password` : `text`}`}
          sizing="sm"
        />
        <Button
          size="small"
          className="col-span-4"
          onClick={() => {
            setFormDisable((prev) => {
              return { ...prev, password: !prev.password };
            });
          }}
        >
          {formDisable.password == true ? (
            <RemoveRedEyeIcon />
          ) : (
            <VisibilityOffIcon />
          )}
        </Button>
      </div>
      <Button
        onClick={() => {
          updateInfo();
        }}
        color="success"
        variant="contained"
        className="bg-green-400"
      >
        Шинэчлэх
      </Button>
    </div>
  );
};

export default ProfileForm;
