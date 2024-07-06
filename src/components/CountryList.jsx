/* eslint-disable react/prop-types */
import { useEffect } from "react";
import CountryCard from "./CountryCard";
import { useTranslation } from "react-i18next";
import Aos from "aos";
import "aos/dist/aos.css";
import { commonStyles } from "../styles/commonStyles";
import useCountryData from "../hooks/useCountryData";
import Loader from "./Loader";
import Empty from "./Empty";

const CountryList = ({
  searchQuery,
  sortOption,
  filterOption,
  countriesPerPage,
  currentPage,
  setTotalCountries,
  totalCountries,
  resetFilters,
}) => {
  const { t } = useTranslation();
  const {
    textMode,
    flexBetween,
    flexJCenter,
    flexCenterStartCol,
    maxWidth1300,
  } = commonStyles;

  const { displayedCountries, loading, filteredCountries } = useCountryData(
    searchQuery,
    sortOption,
    filterOption,
    countriesPerPage,
    currentPage,
    setTotalCountries
  );

  useEffect(() => {
    Aos.init({
      duration: 700,
      easing: "ease-out",
      once: true,
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (filteredCountries.length === 0) {
    return <Empty />;
  }

  return (
    <div className={`${flexCenterStartCol}`}>
      <div className={`${flexBetween} ${maxWidth1300} px-5 py-2`}>
        <p className={`${textMode}`}>
          {totalCountries} {t("countries")}
        </p>
        {filterOption.unMember ||
        filterOption.region.length ||
        filterOption.subRegion.length ||
        filterOption.timeZone.length ? (
          <button
            className={`${textMode} underline cursor-pointer `}
            onClick={resetFilters}
          >
            Ukloni sve filtere
          </button>
        ) : null}
      </div>
      <ul className={`${flexJCenter} ${maxWidth1300}`}>
        {displayedCountries.map((country, index) => (
          <li
            key={index}
            className={`${flexJCenter} w-[15.234rem] my-5 min-[350px]:m-10 `}
            data-aos="fade-up"
            data-aos-delay={(index % 6) * 100}
          >
            <CountryCard country={country} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
