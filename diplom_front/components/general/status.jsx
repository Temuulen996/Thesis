const Status = ({ text, icon, bg, color }) => {
  return (
    <div className={`${bg} ${color} px-1 rounded flex items-center gap-1`}>
      {text} {icon}
    </div>
  );
};

export default Status;
