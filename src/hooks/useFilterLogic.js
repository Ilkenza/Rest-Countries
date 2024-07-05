import { useState, useEffect } from "react";

const useFilterLogic = (initialFilters) => {
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
    if (filters.unMember === "") {
      // Reset to all data when unMember filter is empty
      setData((prevData) => ({
        ...prevData,
        regions: [...prevData.allRegions],
        subRegions: [...prevData.allSubRegions],
        timeZones: [...prevData.allTimeZones],
      }));
      return;
    }

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

      setData((prevData) => ({
        ...prevData,
        regions: Array.from(validRegions).sort(),
        subRegions: Array.from(validSubRegions).sort(),
        timeZones: Array.from(validTimeZones).sort(),
      }));

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

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;

    if (name === "unMember") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: prevFilters[name] === value ? "" : value,
        region: [],
        subRegion: [],
        timeZone: [],
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

  return { filters, data, loading, handleCheckboxChange };
};

export default useFilterLogic;
