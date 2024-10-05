import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  const submitHandler = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search/${searchText}`);
      setSearchText("");
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={submitHandler} className="flex w-11/12">
      <input
        type="text"
        name="search"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        placeholder="Search Products..."
        className="w-full rounded-md p-2 text-gray-800"
      />
      <button
        type="submit"
        className="border border-white rounded-md p-[7px] mx-2"
      >
        Search
      </button>
    </form>
  );
};
export default SearchBox;
