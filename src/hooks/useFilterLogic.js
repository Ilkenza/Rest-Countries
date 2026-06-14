import { useState, useEffect, useMemo } from "react";
import { fetchCountries } from "../utils/fetchCountries";
import { getAvailableFacets } from "../utils/countryFilters";

const useFilterLogic = (initialFilters) => {
  const [filters, setFilters] = useState(initialFilters);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    let active = true;

    fetchCountries()
      .then((countries) => {
        if (!active) return;
        setAllCountries(countries);
        setError(false);
      })
      .catch((err) => {
        console.error("Error loading filter data:", err);
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Available options per category, narrowed by the selections in the OTHER
  // categories (faceted/cascading behavior).
  const data = useMemo(
    () => getAvailableFacets(allCountries, filters),
    [allCountries, filters]
  );

  // Drop any selected values that are no longer available after narrowing, so
  // an incompatible leftover selection can't blank out the country list.
  useEffect(() => {
    if (!allCountries.length) return;
    setFilters((prev) => {
      const region = prev.region.filter((r) => data.regions.includes(r));
      const subRegion = prev.subRegion.filter((s) =>
        data.subRegions.includes(s)
      );
      const timeZone = prev.timeZone.filter((t) => data.timeZones.includes(t));

      const changed =
        region.length !== prev.region.length ||
        subRegion.length !== prev.subRegion.length ||
        timeZone.length !== prev.timeZone.length;

      return changed ? { ...prev, region, subRegion, timeZone } : prev;
    });
  }, [data, allCountries.length]);

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;

    if (name === "unMember") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        unMember: prevFilters.unMember === value ? "" : value,
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

  return { filters, data, loading, error, handleCheckboxChange };
};

export default useFilterLogic;
