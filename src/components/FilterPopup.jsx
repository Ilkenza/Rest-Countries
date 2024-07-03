/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import Loader from "../components/Loader";
import FilterCategories from "./FilterCategories";
import useClickOutside from "../hooks/useClickOutside";
import useFilterLogic from "../hooks/useFilterLogic";
import { useRef } from "react";

const FilterPopup = ({ onApplyFilters, onClose, initialFilters }) => {
  const { t } = useTranslation();
  const { filters, data, loading, handleCheckboxChange } =
    useFilterLogic(initialFilters);

  const popupRef = useRef(null);
  useClickOutside(popupRef, onClose);

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start bg-gray-800 bg-opacity-50 z-50 overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div
          ref={popupRef}
          className="bg-white dark:bg-el_dark rounded-lg max-w-3xl flex flex-col"
        >
          <div className="flex justify-between items-center pt-6 mb-4 px-6">
            <h2 className="text-lg font-bold dark:text-white text-text_light">
              {t("filters")}
            </h2>
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
                className="btn mr-4 px-4 py-2 overflow-hidden inline-block relative border-bg_dark border dark:border-bg_light rounded-md dark:bg-bg_dark active:before:bg-white before:dark:bg-bg_light before:bg-bg_dark text-text_light dark:hover:text-text_light hover:text-white dark:text-white bg-secondary-color dark:bg-primary-color"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleApplyFilters}
                className="button px-4 py-2 font-medium text-bg_dark dark:bg-bg_light after:before:bg-bg_dark dark:after:before:bg-bg_light hover:bg-bg_light dark:hover:bg-bg_dark border-bg_dark dark:border-bg_light border rounded-md"
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
