/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdFilterAlt } from "react-icons/md";
import FilterPopup from "./FilterPopup";
import { commonStyles } from "../styles/commonStyles";

const Filter = ({ onFilter, filterOption }) => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const { textMode, bgMode, flexCenter, h12p2wFullRound } = commonStyles;

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className={`${textMode} ${bgMode} ${flexCenter} ${h12p2wFullRound} min-[480px]:w-1/4 min-[530px]:w-2/4 md:w-32 min-[480px]:mr-5 outline-none`}
      >
        <p className="pr-1">{t("filters")}</p>
        <MdFilterAlt />
      </button>
      {showPopup && (
        <FilterPopup
          onApplyFilters={(e) => {
            onFilter(e);
            setShowPopup(false);
          }}
          onClose={() => setShowPopup(false)}
          initialFilters={filterOption}
        />
      )}
    </>
  );
};

export default Filter;
