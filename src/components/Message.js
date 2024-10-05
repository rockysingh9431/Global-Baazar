const Message = ({ variant, children }) => {
  return (
    <div className="bg-orange-100 border border-red-700 rounded-md text-2xl font-bold p-2 px-12 ">
      {children}
    </div>
  );
};
export default Message;
