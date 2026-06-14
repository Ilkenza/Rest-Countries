import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useDataComponent from "./useDataComponent";
import { fetchCountries } from "../utils/fetchCountries";
import { applyFilters, paginate } from "../utils/countryFilters";

const useCountryData = (
    searchQuery,
    sortOption,
    filterOption,
    countriesPerPage,
    currentPage,
    setTotalCountries
) => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { t } = useTranslation();
    const { sortCountries } = useDataComponent();

    useEffect(() => {
        let active = true;
        setLoading(true);

        fetchCountries()
            .then((data) => {
                if (!active) return;
                setCountries(data);
                setError(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                if (active) setError(true);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

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

    const sortedCountries = sortCountries(filteredCountries, sortOption);

    const displayedCountries = paginate(
        sortedCountries,
        currentPage,
        countriesPerPage
    );

    useEffect(() => {
        if (setTotalCountries) {
            setTotalCountries(filteredCountries.length);
        }
    }, [filteredCountries.length, setTotalCountries]);

    return { displayedCountries, loading, error, filteredCountries };
};

export default useCountryData;
