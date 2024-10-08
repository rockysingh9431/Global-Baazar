const Message = ({ success, children }) => {
  return (
    <div
      className={`${
        success
          ? "bg-green-100 border-green-800"
          : "bg-orange-100 border-red-700"
      } border  rounded-md text-2xl font-bold p-2 px-12`}
    >
      {children}
    </div>
  );
};
export default Message;
