import { describe, it, expect } from "vitest";
import { applyFilters, paginate, getAvailableFacets } from "./countryFilters";

const emptyFilters = {
  unMember: "",
  region: [],
  subRegion: [],
  timeZone: [],
};

const countries = [
  {
    name: "Aland",
    unMember: false,
    region: "Europe",
    subregion: "Northern Europe",
    timezones: ["UTC+02:00"],
  },
  {
    name: "Brazil",
    unMember: true,
    region: "Americas",
    subregion: "South America",
    timezones: ["UTC-03:00"],
  },
  {
    name: "Chad",
    unMember: true,
    region: "Africa",
    subregion: "Middle Africa",
    timezones: ["UTC+01:00"],
  },
];

describe("applyFilters", () => {
  it("returns all countries when no filters are set", () => {
    expect(applyFilters(countries, emptyFilters)).toHaveLength(3);
  });

  it("returns an empty array for an empty list", () => {
    expect(applyFilters([], emptyFilters)).toEqual([]);
  });

  it("filters by region", () => {
    const result = applyFilters(countries, {
      ...emptyFilters,
      region: ["Africa"],
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Chad");
  });

  it("filters by UN membership", () => {
    const result = applyFilters(countries, { ...emptyFilters, unMember: "true" });
    expect(result.map((c) => c.name)).toEqual(["Brazil", "Chad"]);
  });

  it("filters by time zone", () => {
    const result = applyFilters(countries, {
      ...emptyFilters,
      timeZone: ["UTC-03:00"],
    });
    expect(result.map((c) => c.name)).toEqual(["Brazil"]);
  });

  it("combines multiple filters (AND)", () => {
    const result = applyFilters(countries, {
      ...emptyFilters,
      unMember: "true",
      region: ["Africa"],
    });
    expect(result.map((c) => c.name)).toEqual(["Chad"]);
  });
});

describe("getAvailableFacets", () => {
  it("returns every distinct value when no filters are set", () => {
    const facets = getAvailableFacets(countries, emptyFilters);
    expect(facets.regions).toEqual(["Africa", "Americas", "Europe"]);
    expect(facets.subRegions).toEqual([
      "Middle Africa",
      "Northern Europe",
      "South America",
    ]);
    expect(facets.timeZones).toEqual(["UTC+01:00", "UTC+02:00", "UTC-03:00"]);
  });

  it("narrows the other categories when a region is selected", () => {
    const facets = getAvailableFacets(countries, {
      ...emptyFilters,
      region: ["Europe"],
    });
    // sub-regions and time zones collapse to Europe-only values
    expect(facets.subRegions).toEqual(["Northern Europe"]);
    expect(facets.timeZones).toEqual(["UTC+02:00"]);
    // the region list itself still offers every region (its own filter excluded)
    expect(facets.regions).toEqual(["Africa", "Americas", "Europe"]);
  });

  it("narrows by UN membership", () => {
    const facets = getAvailableFacets(countries, {
      ...emptyFilters,
      unMember: "true",
    });
    expect(facets.regions).toEqual(["Africa", "Americas"]);
    expect(facets.subRegions).toEqual(["Middle Africa", "South America"]);
  });
});

describe("paginate", () => {
  const items = [1, 2, 3, 4, 5];

  it("returns the slice for the first page", () => {
    expect(paginate(items, 1, 2)).toEqual([1, 2]);
  });

  it("returns the slice for a middle page", () => {
    expect(paginate(items, 2, 2)).toEqual([3, 4]);
  });

  it("returns the remainder on the last page", () => {
    expect(paginate(items, 3, 2)).toEqual([5]);
  });

  it("does not mutate the source array", () => {
    paginate(items, 1, 2);
    expect(items).toEqual([1, 2, 3, 4, 5]);
  });
});
