import { useState, useCallback } from "react";
import CountryList from "../components/CountryList";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import Sorting from "../components/Sorting";
import useFilters from "../hooks/useFilters";
import usePagination from "../hooks/usePagination";
import { commonStyles } from "../styles/commonStyles";
import useSort from "../hooks/useSort";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { sortOption, handleSort } = useSort("");
  const [totalCountries, setTotalCountries] = useState(250);
  const countriesPerPage = 24;

  const {
    flexBetween,
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

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className={`${flexItemsCenterCol} pt-[7rem]`}>
      <div className={`${flexBetween} ${maxWidth1300} px-5`}>
        <div className={`${flexCenterBetweenCol} md:flex-row w-full`}>
          <SearchBar onSearch={handleSearch} />
          <div
            className={`${flexCenterBetweenCol} min-[480px]:flex-row w-full md:w-[23.25rem]`}
          >
            <Filter onFilter={handleFilter} filterOption={filterOption} />
            <Sorting sortOption={sortOption} onSort={handleSort} />
          </div>
        </div>
      </div>

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
  );
};

export default HomePage;
