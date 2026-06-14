// Pure helpers for narrowing and paginating the country list.
// Kept side-effect free so they can be unit tested in isolation.

// Per-category matchers. A country matches a category when that category has no
// active selection, or when the country's value is among the selected ones.
const matchUnMember = (country, filters) =>
  !filters.unMember.length || filters.unMember.includes(String(country.unMember));

const matchRegion = (country, filters) =>
  !filters.region.length || filters.region.includes(country.region);

const matchSubRegion = (country, filters) =>
  !filters.subRegion.length || filters.subRegion.includes(country.subregion);

const matchTimeZone = (country, filters) =>
  !filters.timeZone.length ||
  filters.timeZone.some((tz) => country.timezones.includes(tz));

export const applyFilters = (countries, filters) => {
  if (!countries.length) return [];
  return countries.filter(
    (country) =>
      matchUnMember(country, filters) &&
      matchRegion(country, filters) &&
      matchSubRegion(country, filters) &&
      matchTimeZone(country, filters)
  );
};

// Faceted/cascading options: for each category, the available values are those
// found among countries that match every OTHER active filter (excluding the
// category's own selection). Selecting one filter therefore narrows the others.
export const getAvailableFacets = (countries, filters) => {
  const regions = new Set();
  const subRegions = new Set();
  const timeZones = new Set();

  countries.forEach((country) => {
    if (
      matchUnMember(country, filters) &&
      matchSubRegion(country, filters) &&
      matchTimeZone(country, filters) &&
      country.region
    ) {
      regions.add(country.region);
    }
    if (
      matchUnMember(country, filters) &&
      matchRegion(country, filters) &&
      matchTimeZone(country, filters) &&
      country.subregion
    ) {
      subRegions.add(country.subregion);
    }
    if (
      matchUnMember(country, filters) &&
      matchRegion(country, filters) &&
      matchSubRegion(country, filters) &&
      country.timezones
    ) {
      country.timezones.forEach((tz) => timeZones.add(tz));
    }
  });

  return {
    regions: Array.from(regions).sort(),
    subRegions: Array.from(subRegions).sort(),
    timeZones: Array.from(timeZones).sort(),
  };
};

export const paginate = (items, currentPage, perPage) => {
  const startIndex = (currentPage - 1) * perPage;
  return items.slice(startIndex, startIndex + perPage);
};
