/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import Loader from "../components/Loader";
import FilterCategories from "./FilterCategories";
import useClickOutside from "../hooks/useClickOutside";
import useFilterLogic from "../hooks/useFilterLogic";
import { useRef } from "react";
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

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div
      className={`${flexJCenter} items-start fixed inset-0 bg-gray-800 bg-opacity-50 z-50 overflow-y-auto`}
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
            <h2 className={`${textMode}${boldTextLG}`}>{t("filters")}</h2>
            <button
              onClick={onClose}
              className="outline-none focus:outline-none pl-4"
            >
              <MdClose className="text-gray-500 dark:text-gray-300" />
            </button>
          </div>

          <div className="pl-6">
            <FilterCategories
              data={{
                regions:
                  filters.timeZone.length > 0 ||
                  filters.subRegion.length > 0 ||
                  filters.unMember !== ""
                    ? data.regions
                    : data.allRegions,
                subRegions:
                  filters.region.length > 0 ||
                  filters.timeZone.length > 0 ||
                  filters.unMember !== ""
                    ? data.subRegions
                    : data.allSubRegions,
                timeZones:
                  filters.region.length > 0 ||
                  filters.subRegion.length > 0 ||
                  filters.unMember !== ""
                    ? data.timeZones
                    : data.allTimeZones,
              }}
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

export default FilterPopup;
