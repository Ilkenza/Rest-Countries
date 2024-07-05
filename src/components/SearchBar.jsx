/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { commonStyles } from "../styles/commonStyles";

const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { textMode, bgMode, flexCenterItems } = commonStyles;

  useEffect(() => {
    const savedSearch = localStorage.getItem("searchQuery");
    if (savedSearch) {
      setSearchQuery(savedSearch);
      onSearch(savedSearch);
    }
  }, [onSearch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    localStorage.setItem("searchQuery", e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div
      className={`${bgMode} ${flexCenterItems} px-3 py-2 justify-evenly mb-4 md:mb-0 w-full md:w-[22rem] lg:w-[30rem] rounded-md`}
    >
      <FaMagnifyingGlass className={`${textMode} text-md mr-1 `} />
      <input
        type="text"
        placeholder={t("search_placeholder")}
        value={searchQuery}
        onChange={handleSearchChange}
        className={`${textMode} ${bgMode} w-[70%] md:w-[17rem] lg:w-[23rem] p-1 outline-none font-medium`}
      />
    </div>
  );
};

export default SearchBar;
