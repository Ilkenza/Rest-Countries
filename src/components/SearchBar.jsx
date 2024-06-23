/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="flex px-3 py-2 items-center justify-evenly bg-white dark:bg-el_dark mb-4 md:mb-0 w-full md:w-[22rem] lg:w-[30rem] rounded-md">
      <FaMagnifyingGlass className="text-md mr-1 dark:text-white text-text_light" />
      <input
        type="text"
        placeholder={t("search_placeholder")}
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-[70%] md:w-[17rem] lg:w-[23rem] p-1 outline-none bg-white dark:bg-el_dark dark:text-white text-text_light font-medium"
      />
    </div>
  );
};

export default SearchBar;
