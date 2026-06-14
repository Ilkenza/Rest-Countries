import { useState } from "react";
import PropTypes from "prop-types";
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

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filterOption: PropTypes.object.isRequired,
};

export default Filter;
//slike pexels istock shutterstock unsplash creative licence, boje iz asosiacije slike izvuci za nisu koju se radi i ne previse saturacije, ne vise od 2 boje za tekst, google fonts serif za skuplje sajtove, 2 do 3 fonta po sajtu, ilustracije flaticon uzimati pack da bi dobili isti izgled ikonica, google material icons, undraw.co, sketchappsources, storyset.com, behance dribble awwwards za dizajn sajtova insipracija,
