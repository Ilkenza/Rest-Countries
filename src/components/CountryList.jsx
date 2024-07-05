/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import Loader from "./Loader";
import Empty from "./Empty";
import { useTranslation } from "react-i18next";
import Aos from "aos";
import "aos/dist/aos.css";
import { commonStyles } from "../styles/commonStyles";

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
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const {
    textMode,
    flexBetween,
    flexJCenter,
    flexCenterStartCol,
    maxWidth1300,
  } = commonStyles;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 700,
      easing: "ease-out",
      once: true,
    });
  }, []);

  const applyFilters = (countries, filters) => {
    return countries.filter((country) => {
      const matchesUnMember =
        !filters.unMember.length ||
        filters.unMember.includes(String(country.unMember));
      const matchesRegion =
        !filters.region.length || filters.region.includes(country.region);
      const matchesSubRegion =
        !filters.subRegion.length ||
        filters.subRegion.includes(country.subregion);
      const matchesTimeZone =
        !filters.timeZone.length ||
        filters.timeZone.some((tz) => country.timezones.includes(tz));

      return (
        matchesUnMember && matchesRegion && matchesSubRegion && matchesTimeZone
      );
    });
  };

  const filteredCountries = applyFilters(
    countries.filter((country) => {
      const searchLower = searchQuery.toLowerCase();
      const translatedName = t(`country.${country.name}`).toLowerCase();
      const nameMatch = translatedName.includes(searchLower);

      const languageMatch = Object.values(country.languages || {}).some(
        (language) =>
          typeof language === "string" &&
          language.toLowerCase().includes(searchLower)
      );
      return nameMatch || languageMatch;
    }),
    filterOption
  );

  const sortCountries = (countries, sortOption) => {
    const translatedCountries = countries.map((country) => ({
      ...country,
      translatedName: t(`country.${country.name}`),
    }));

    switch (sortOption) {
      case "name-asc":
        return translatedCountries.sort((a, b) =>
          a.translatedName.localeCompare(b.translatedName, "pt")
        );
      case "name-desc":
        return translatedCountries.sort((a, b) =>
          b.translatedName.localeCompare(a.translatedName, "pt")
        );
      case "population-asc":
        return countries.sort((a, b) => a.population - b.population);
      case "population-desc":
        return countries.sort((a, b) => b.population - a.population);
      default:
        return countries;
    }
  };

  const sortedCountries = sortCountries(filteredCountries, sortOption);

  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const displayedCountries = sortedCountries.slice(startIndex, endIndex);

  useEffect(() => {
    setTotalCountries(filteredCountries.length);
  }, [filteredCountries, setTotalCountries]);

  return (
    <div className={`${flexCenterStartCol}`}>
      {loading ? (
        <Loader />
      ) : filteredCountries.length === 0 ? (
        <Empty />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default CountryList;
