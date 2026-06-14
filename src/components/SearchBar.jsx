import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { commonStyles } from "../styles/commonStyles";
import useLocalStorage from "../hooks/useLocalStorage";

const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useLocalStorage("searchQuery", "");

  const { textMode, bgMode, flexCenterItems } = commonStyles;

  // Debounce the search so the country list isn't re-filtered on every keystroke.
  useEffect(() => {
    const timeoutId = setTimeout(() => onSearch(searchQuery), 300);
    return () => clearTimeout(timeoutId);
  }, [onSearch, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
