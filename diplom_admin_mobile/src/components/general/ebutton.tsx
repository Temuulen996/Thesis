import { Button, Text, TouchableOpacity, View } from "react-native";

interface EbuttonProps {
  label: string;
  func: () => void;
  classNamee: string;
  icon?: JSX.Element;
}
const Ebutton = ({ label, func, classNamee, icon }: EbuttonProps) => {
  return (
    <TouchableOpacity
      className={`  ${classNamee} bg-slate-700  px-2 py-2 rounded-md flex flex-row justify-center items-center `}
      onPress={() => {
        func();
      }}
    >
      {icon ? icon : ""}
      <Text className="text-white text-center ">{label}</Text>
    </TouchableOpacity>
  );
};

export default Ebutton;
