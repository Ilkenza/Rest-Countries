import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DataComponent from "../components/DataComponent";

const useCountryData = (
    searchQuery,
    sortOption,
    filterOption,
    countriesPerPage,
    currentPage,
    setTotalCountries, totalCountries
) => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const { sortCountries } = DataComponent();

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
        if (countries.length > 0) {
            setLoading(false);
        }
    }, [countries]);

    const applyFilters = (countries, filters) => {
        if (!countries.length) return [];
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

    const sortedCountries = sortCountries(filteredCountries, sortOption);

    const startIndex = (currentPage - 1) * countriesPerPage;
    const endIndex = startIndex + countriesPerPage;
    const displayedCountries = sortedCountries.slice(startIndex, endIndex);

    useEffect(() => {
        if (setTotalCountries && totalCountries !== filteredCountries.length) {
            setTotalCountries(filteredCountries.length);
        }
    }, [filteredCountries.length, setTotalCountries, totalCountries]);

    return { displayedCountries, loading, filteredCountries, setLoading };
};

export default useCountryData;