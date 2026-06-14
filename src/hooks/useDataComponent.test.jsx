import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useDataComponent from "./useDataComponent";

// Translate country.<name> to the raw name so sorting/collation is predictable.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key.replace(/^country\./, ""),
    i18n: { language: "en" },
  }),
}));

const sample = [
  { name: "Brazil", population: 200 },
  { name: "Albania", population: 50 },
  { name: "Chad", population: 120 },
];

describe("useDataComponent.sortCountries", () => {
  it("sorts by population ascending", () => {
    const { result } = renderHook(() => useDataComponent());
    const sorted = result.current.sortCountries(sample, "population-asc");
    expect(sorted.map((c) => c.population)).toEqual([50, 120, 200]);
  });

  it("sorts by population descending", () => {
    const { result } = renderHook(() => useDataComponent());
    const sorted = result.current.sortCountries(sample, "population-desc");
    expect(sorted.map((c) => c.population)).toEqual([200, 120, 50]);
  });

  it("sorts by name ascending", () => {
    const { result } = renderHook(() => useDataComponent());
    const sorted = result.current.sortCountries(sample, "name-asc");
    expect(sorted.map((c) => c.name)).toEqual(["Albania", "Brazil", "Chad"]);
  });

  it("does not mutate the input array when sorting by population", () => {
    const { result } = renderHook(() => useDataComponent());
    result.current.sortCountries(sample, "population-asc");
    expect(sample.map((c) => c.name)).toEqual(["Brazil", "Albania", "Chad"]);
  });
});
