/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowRight } from "react-icons/md";
import useClickOutside from "../hooks/useClickOutside";
import useLocalStorage from "../hooks/useLocalStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { commonStyles } from "../styles/commonStyles";

const Sorting = ({ onSort }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const sortingRef = useRef(null);
  const [sortOption, setSortOption] = useLocalStorage("sortOption", "name-asc");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    textMode,
    bgMode,
    flexBetween,
    flexCenterItems,
    transOpacity,
    transAll,
    h12p2wFullRound,
    absP2RoundShadow,
    darkHoverBg,
  } = commonStyles;

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
          className={`${textMode} ${bgMode} ${flexBetween} ${h12p2wFullRound} cursor-pointer`}
        >
          {t("Sort_By")}
          <MdKeyboardArrowRight
            className={`${flexCenterItems} ${transAll} pointer-events-none ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </div>

        <div
          className={`${textMode} ${bgMode} ${absP2RoundShadow} ${transAll} z-10 w-full mt-2 ${
            isOpen
              ? "max-h-90 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <ul
            className={`${transOpacity} ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {sortOptions.map((option) => (
              <li
                key={option.value}
                value={sortOption}
                className={`${flexBetween} ${darkHoverBg} h-18 my-2 px-4 hover:bg-gray-200 cursor-pointer`}
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
