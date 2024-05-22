import { AntDesign } from "@expo/vector-icons";
import { Button, Text, TouchableOpacity, View } from "react-native";

const Ebutton = ({ label, func, classNamee, icon, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      className={`  ${classNamee} ${
        disabled ? "bg-white  border-slate-700 border-[1px]" : "bg-slate-700 "
      }  flex flex-row justify-center items-center  px-2 py-2 rounded-md `}
      onPress={() => {
        func();
      }}
    >
      {disabled ? (
        <AntDesign name="check" size={24} color="black" />
      ) : icon ? (
        icon
      ) : (
        ""
      )}

      <Text
        className={`${
          disabled ? "text-slate-700" : "text-white"
        } text-center ml-2`}
      >
        {disabled ? "Сагсанд орсон байна!" : label}
      </Text>
    </TouchableOpacity>
  );
};

export default Ebutton;
