import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import Loader from "../components/Loader";
import FilterCategories from "./FilterCategories";
import useClickOutside from "../hooks/useClickOutside";
import useFilterLogic from "../hooks/useFilterLogic";
import { useEffect, useRef } from "react";
import { commonStyles } from "../styles/commonStyles";

const FilterPopup = ({ onApplyFilters, onClose, initialFilters }) => {
  const { t } = useTranslation();
  const { filters, data, loading, handleCheckboxChange } =
    useFilterLogic(initialFilters);
  const {
    textMode,
    bgMode,
    flexCenter,
    flexBetween,
    flexJCenter,
    flexCol,
    boldTextLG,
    borderRounded,
    darkHoverBg,
  } = commonStyles;

  const popupRef = useRef(null);
  useClickOutside(popupRef, onClose);

  // Lock background scroll while the modal is open and close it on Escape.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };
  const { regions, subRegions, timeZones } = data;

  return (
    <div
      className={`${flexJCenter} items-start fixed inset-0 bg-gray-800 bg-opacity-50 z-50 overflow-y-auto`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-popup-title"
    >
      {loading ? (
        <div className={`${flexCenter} h-full`}>
          <Loader />
        </div>
      ) : (
        <div
          ref={popupRef}
          className={`${bgMode} ${flexCol} rounded-lg max-w-3xl`}
        >
          <div className={`${flexBetween} pt-6 mb-4 px-6`}>
            <h2 id="filter-popup-title" className={`${textMode} ${boldTextLG}`}>
              {t("filters")}
            </h2>
            <button
              onClick={onClose}
              aria-label={t("cancel")}
              className="outline-none focus:outline-none pl-4"
            >
              <MdClose className="text-gray-500 dark:text-gray-300" />
            </button>
          </div>

          <div className="pl-6">
            <FilterCategories
              data={{ regions, subRegions, timeZones }}
              filters={filters}
              handleCheckboxChange={handleCheckboxChange}
            />

            <div className="flex justify-end pr-6 pb-6">
              <button
                onClick={onClose}
                className={`${textMode} ${borderRounded} btn dark:bg-bg_dark active:before:bg-white before:dark:bg-bg_light before:bg-bg_dark dark:hover:text-text_light hover:text-white`}
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleApplyFilters}
                className={`${borderRounded} ${darkHoverBg} button text-bg_dark dark:bg-bg_light after:before:bg-bg_dark dark:after:before:bg-bg_light hover:bg-bg_light`}
              >
                {t("apply")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FilterPopup.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialFilters: PropTypes.object.isRequired,
};

export default FilterPopup;
