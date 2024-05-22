const ActionBtn = ({ icon, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30x] text-slate-700 border border-slate-400 ${
        disabled && "opacity-50 cursor-auto"
      }`}
    >
      {icon}
    </button>
  );
};

export default ActionBtn;
