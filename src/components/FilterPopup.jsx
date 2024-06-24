/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import Loader from "../components/Loader";
import FilterCategories from "./FilterCategories";
import useClickOutside from "../hooks/useClickOutside";

const FilterPopup = ({ onApplyFilters, onClose, initialFilters }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState(initialFilters);

  const [data, setData] = useState({
    regions: [],
    subRegions: [],
    timeZones: [],
    allRegions: [],
    allSubRegions: [],
    allTimeZones: [],
  });

  const [loading, setLoading] = useState(true);
  const popupRef = useRef(null);

  useClickOutside(popupRef, onClose);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data.json");
      const countries = await response.json();

      const regions = new Set();
      const subRegions = new Set();
      const timeZones = new Set();

      countries.forEach((country) => {
        if (country.region) {
          regions.add(country.region);
        }
        if (country.subregion) {
          subRegions.add(country.subregion);
        }
        if (country.timezones) {
          country.timezones.forEach((timezone) => timeZones.add(timezone));
        }
      });

      setData({
        regions: Array.from(regions).sort(),
        subRegions: Array.from(subRegions).sort(),
        timeZones: Array.from(timeZones).sort(),
        allRegions: Array.from(regions).sort(),
        allSubRegions: Array.from(subRegions).sort(),
        allTimeZones: Array.from(timeZones).sort(),
      });

      setLoading(false);
    };

    fetchData();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const updateFilteredData = async () => {
      const response = await fetch("/data.json");
      const countries = await response.json();

      const filteredRegions =
        filters.region.length > 0 ? filters.region : data.allRegions;

      const subRegions = new Set();
      const timeZones = new Set();

      countries.forEach((country) => {
        const regionMatches = filteredRegions.includes(country.region);
        const unMemberMatches =
          filters.unMember === "" ||
          filters.unMember === String(country.unMember);
        const timeZoneMatches =
          filters.timeZone.length === 0 ||
          filters.timeZone.some((tz) => country.timezones.includes(tz));
        const subRegionMatches =
          filters.subRegion.length === 0 ||
          filters.subRegion.includes(country.subregion);

        if (
          regionMatches &&
          unMemberMatches &&
          timeZoneMatches &&
          subRegionMatches
        ) {
          if (country.subregion) {
            subRegions.add(country.subregion);
          }
          if (country.timezones) {
            country.timezones.forEach((timezone) => timeZones.add(timezone));
          }
        }
      });

      setData((prevData) => ({
        ...prevData,
        subRegions: Array.from(subRegions).sort(),
        timeZones: Array.from(timeZones).sort(),
      }));
    };

    updateFilteredData();
  }, [
    filters.region,
    filters.unMember,
    filters.timeZone,
    filters.subRegion,
    data.allRegions,
  ]);

  useEffect(() => {
    if (filters.unMember === "") return;

    const resetInvalidFilters = async () => {
      const response = await fetch("/data.json");
      const countries = await response.json();

      const validRegions = new Set();
      const validSubRegions = new Set();
      const validTimeZones = new Set();

      countries.forEach((country) => {
        if (String(country.unMember) === filters.unMember) {
          if (country.region) validRegions.add(country.region);
          if (country.subregion) validSubRegions.add(country.subregion);
          if (country.timezones) {
            country.timezones.forEach((timezone) =>
              validTimeZones.add(timezone)
            );
          }
        }
      });

      setFilters((prevFilters) => ({
        ...prevFilters,
        region: prevFilters.region.filter((r) => validRegions.has(r)),
        subRegion: prevFilters.subRegion.filter((sr) =>
          validSubRegions.has(sr)
        ),
        timeZone: prevFilters.timeZone.filter((tz) => validTimeZones.has(tz)),
      }));
    };

    resetInvalidFilters();
  }, [filters.unMember]);

  useEffect(() => {
    if (filters.subRegion.length === 0) return;

    const filterRegionsBySubRegion = async () => {
      const response = await fetch("/data.json");
      const countries = await response.json();

      const validRegions = new Set();

      countries.forEach((country) => {
        if (filters.subRegion.includes(country.subregion)) {
          if (country.region) validRegions.add(country.region);
        }
      });

      setData((prevData) => ({
        ...prevData,
        regions: Array.from(validRegions).sort(),
      }));
    };

    filterRegionsBySubRegion();
  }, [filters.subRegion]);

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;

    if (name === "unMember") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: prevFilters[name] === value ? "" : value,
        subRegion: [],
        timeZone: [],
      }));
    } else if (name === "region") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: prevFilters[name].includes(value)
          ? prevFilters[name].filter((item) => item !== value)
          : [...prevFilters[name], value],
        subRegion: prevFilters[name].includes(value)
          ? prevFilters.subRegion
          : [],
        timeZone: prevFilters[name].includes(value) ? prevFilters.timeZone : [],
      }));
    } else if (name === "subRegion") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: prevFilters[name].includes(value)
          ? prevFilters[name].filter((item) => item !== value)
          : [...prevFilters[name], value],
        region: [],
      }));
    } else if (name === "timeZone") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: prevFilters[name].includes(value)
          ? prevFilters[name].filter((item) => item !== value)
          : [...prevFilters[name], value],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: prevFilters[name].includes(value)
          ? prevFilters[name].filter((item) => item !== value)
          : [...prevFilters[name], value],
      }));
    }
  };

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
            <div className="mb-4">
              <label className="block mb-2 dark:text-white text-text_light font-bold">
                {t("unMember")}
              </label>
              <div className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 gap-1">
                <div className="flex items-center space-x-2 w-56">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="unMember"
                      value="true"
                      onChange={handleCheckboxChange}
                      checked={filters.unMember === "true"}
                      className="ui-checkbox relative cursor-pointer appearance-none w-5 h-5 rounded-md"
                    />
                    <span className="dark:text-white text-text_light font-extralight opacity-80">
                      {t("yes")}
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="unMember"
                      value="false"
                      onChange={handleCheckboxChange}
                      checked={filters.unMember === "false"}
                      className="ui-checkbox relative cursor-pointer appearance-none w-5 h-5 rounded-md"
                    />
                    <span className="dark:text-white text-text_light font-extralight opacity-80">
                      {t("no")}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <FilterCategories
              data={{
                regions:
                  filters.timeZone.length > 0 || filters.subRegion.length > 0
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
