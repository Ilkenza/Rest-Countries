import { useState, useEffect } from "react";
import CountryList from "../components/CountryList";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import Sorting from "../components/Sorting";
import { useTranslation } from "react-i18next";
import useFilters from "../hooks/useFilters";
import usePagination from "../hooks/usePagination";
import { commonStyles } from "../styles/commonStyles";
import useSort from "../hooks/useSort";

const HomePage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { sortOption, handleSort } = useSort("");
  const [loading, setLoading] = useState(false);
  const [totalCountries, setTotalCountries] = useState(250);
  const countriesPerPage = 24;

  const {
    textMode,
    flexBetween,
    underlinePy,
    maxWidth1300,
    flexCenterBetweenCol,
    flexItemsCenterCol,
  } = commonStyles;

  const { filterOption, handleFilter, handleResetFilters } = useFilters({
    unMember: "",
    region: [],
    subRegion: [],
    timeZone: [],
  });

  const { currentPage, totalPages, handlePageChange } = usePagination(
    1,
    totalCountries,
    countriesPerPage
  );

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery, sortOption, filterOption, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={`${flexItemsCenterCol} pt-[7rem]`}>
      <div className={`${flexBetween} ${maxWidth1300} px-5`}>
        <div className={`${flexCenterBetweenCol} md:flex-row w-full`}>
          <SearchBar onSearch={handleSearch} />
          <div
            className={`${flexCenterBetweenCol} min-[480px]:flex-row w-full md:w-[23.25rem]`}
          >
            <Filter onFilter={handleFilter} filterOption={filterOption} />
            <Sorting onSort={handleSort} />
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div>
          <CountryList
            searchQuery={searchQuery}
            sortOption={sortOption}
            filterOption={filterOption}
            countriesPerPage={countriesPerPage}
            currentPage={currentPage}
            setTotalCountries={setTotalCountries}
            totalCountries={totalCountries}
            resetFilters={handleResetFilters}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <a
        href="https://linktr.ee/ilkenza"
        target="_blank"
        className={`${textMode} ${underlinePy} hover:opacity-70`}
      >
        {t("Madeby")} Korodić Ilija
      </a>
    </div>
  );
};

export default HomePage;
