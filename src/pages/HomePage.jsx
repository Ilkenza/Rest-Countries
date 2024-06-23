import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CountryList from "../components/CountryList";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import Sorting from "../components/Sorting";
import { useTranslation } from "react-i18next";
import useFilters from "../hooks/useFilters";
import usePagination from "../hooks/usePagination";
import useLocalStorage from "../hooks/useLocalStorage";

const HomePage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useLocalStorage("sortOption", "name-asc");
  const [loading, setLoading] = useState(false);
  const [totalCountries, setTotalCountries] = useState(250);
  const countriesPerPage = 24;
  const location = useLocation();
  const navigate = useNavigate();

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
    }, 100);

    return () => clearTimeout(timer);
  }, [searchQuery, sortOption, filterOption, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("sort", option);
    queryParams.set("page", 1);
    navigate({ search: queryParams.toString() });
  };

  return (
    <div className="flex flex-col items-center pt-[7rem]">
      <div className="max-w-[1300px] w-full px-5 flex items-center justify-between">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <SearchBar onSearch={handleSearch} />
          <div className="flex flex-col min-[480px]:flex-row items-center w-full md:w-[23.25rem] justify-between">
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
        className="dark:text-white text-text_light py-1 underline hover:opacity-70"
      >
        {t("Madeby")} Korodić Ilija
      </a>
    </div>
  );
};

export default HomePage;
