import { useEffect, useState } from "react";

const useCountryData = (setTotalCountries) => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const applyFilters = (countries, filters) => {
        if (!countries.length) return;
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

    const filteredCountriess = (countries, searchQuery, t) => {
        return countries.filter((country) => {
            const searchLower = searchQuery.toLowerCase();
            const translatedName = t(`country.${country.name}`).toLowerCase();
            const nameMatch = translatedName.includes(searchLower);

            const languageMatch = Object.values(country.languages || {}).some(
                (language) =>
                    typeof language === "string" &&
                    language.toLowerCase().includes(searchLower)
            );

            return nameMatch || languageMatch;
        });
    };

    useEffect(() => {
        if (countries.length > 0) {
            const filtered = applyFilters(countries, {}); // Apply filters with initial empty filters
            setFilteredCountries(filtered);
            setTotalCountries(filtered.length);
        }
    }, [countries, setTotalCountries]);

    return { countries, loading, filteredCountries, applyFilters, filteredCountriess };
};

export default useCountryData;
