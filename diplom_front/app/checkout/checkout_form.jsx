import { TextField } from "@mui/material";
import { Label, TextInput } from "flowbite-react";
const CheckoutForm = () => {
  return (
    <div className="flex flex-col gap-1 w-[50%]">
      <div className="w-full">
        <TextInput id="small" type="text" sizing="sm" placeholder="Total" />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            placeholder="First name"
          />
        </div>
        <div className="col-span-6">
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            placeholder="Last name"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className=" grid col-span-8">
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            className="w-full"
            placeholder="Card number"
          />
        </div>
        <div className="  col-span-4">
          <TextInput id="small" type="text" sizing="sm" placeholder="CVV" />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <div className="grid grid-cols-12">
            <div>psd</div>
          </div>
        </div>

        <div className="col-span-8">
          <TextInput id="small" type="text" sizing="sm" placeholder="MM/YY" />
        </div>
      </div>
      <div className="w-full">
        <button className="bg-green-400 rounded-sm w-full mt-2 py-2 text-white hover:bg-green-500 transition-all duration-150">
          Submit payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
