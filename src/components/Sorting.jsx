/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowRight } from "react-icons/md";
import useClickOutside from "../hooks/useClickOutside";
import useLocalStorage from "../hooks/useLocalStorage";
import { useLocation, useNavigate } from "react-router-dom";

const Sorting = ({ onSort }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const sortingRef = useRef(null);
  const [sortOption, setSortOption] = useLocalStorage("sortOption", "name-asc");
  const location = useLocation();
  const navigate = useNavigate();

  useClickOutside(sortingRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (sortOption && queryParams.get("sort") !== sortOption) {
      queryParams.set("sort", sortOption);
      navigate({ search: queryParams.toString() }, { replace: true });
      onSort(sortOption);
    }
  }, [sortOption, location, navigate, onSort]);

  const handleSortChange = (sortValue) => {
    setSortOption(sortValue);
    onSort(sortValue);
    setIsOpen(false);
  };

  const sortOptions = [
    { value: "name-asc", label: t("sortByNameAsc") },
    { value: "name-desc", label: t("sortByNameDesc") },
    { value: "population-asc", label: t("sortByPopulationAsc") },
    { value: "population-desc", label: t("sortByPopulationDesc") },
  ];

  return (
    <div className="relative w-full my-4 md:w-72" ref={sortingRef}>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-12 p-2 flex items-center justify-between rounded-md bg-white dark:bg-el_dark dark:text-white text-text_light cursor-pointer"
        >
          {t("Sort_By")}
          <MdKeyboardArrowRight
            className={`flex items-center pointer-events-none transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </div>

        <div
          className={`absolute z-10 w-full mt-2 p-2 rounded-md bg-white dark:bg-el_dark dark:text-white text-text_light shadow-lg overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-90 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul
            className={`transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {sortOptions.map((option) => (
              <li
                key={option.value}
                value={sortOption}
                className="h-18 my-2 flex items-center justify-between px-4 hover:bg-gray-200 dark:hover:bg-bg_dark cursor-pointer"
                onClick={() => handleSortChange(option.value)}
              >
                <span className="py-1">{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sorting;
