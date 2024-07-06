/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowRight } from "react-icons/md";
import useClickOutside from "../hooks/useClickOutside";
import { commonStyles } from "../styles/commonStyles";
import DataComponent from "./DataComponent";
import useSort from "../hooks/useSort";

const Sorting = ({ onSort }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const sortingRef = useRef(null);
  const { sortOption, handleSort } = useSort("");

  const { sortOptions } = DataComponent();
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

  const handleSortChange = (sortValue) => {
    handleSort(sortValue);
    onSort(sortValue);
    setIsOpen(false);
  };

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
            className={`${transOpacity} p-1 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {sortOptions.map((option) => (
              <li
                key={option.value}
                value={sortOption}
                className={`${flexBetween} ${darkHoverBg} h-18 my-2 py-1 px-3 hover:bg-gray-200 cursor-pointer`}
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
