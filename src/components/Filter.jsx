/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdFilterAlt } from "react-icons/md";
import FilterPopup from "./FilterPopup";

const Filter = ({ onFilter, filterOption }) => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);

  const handleApplyFilters = (filters) => {
    onFilter(filters);
    setShowPopup(false);
  };

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="w-full min-[480px]:w-1/4 min-[530px]:w-2/4 md:w-32 h-12 p-2 min-[480px]:mr-5 flex items-center justify-center rounded-md outline-none bg-white dark:bg-el_dark dark:text-white text-text_light"
      >
        <p className="pr-1">{t("filters")}</p>
        <MdFilterAlt />
      </button>
      {showPopup && (
        <FilterPopup
          onApplyFilters={handleApplyFilters}
          onClose={() => setShowPopup(false)}
          initialFilters={filterOption}
        />
      )}
    </>
  );
};

export default Filter;
