import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "./Filter";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k) => k, i18n: { language: "en" } }),
}));

vi.mock("../utils/fetchCountries", () => ({
  fetchCountries: vi.fn(() =>
    Promise.resolve([
      {
        name: "France",
        unMember: true,
        region: "Europe",
        subregion: "Western Europe",
        timezones: ["UTC+01:00"],
        population: 1,
      },
      {
        name: "Brazil",
        unMember: true,
        region: "Americas",
        subregion: "South America",
        timezones: ["UTC-03:00"],
        population: 2,
      },
    ])
  ),
}));

const initialFilters = { unMember: "", region: [], subRegion: [], timeZone: [] };

describe("Filter popup", () => {
  it("opens the popup with category options when the button is clicked", async () => {
    render(<Filter onFilter={() => {}} filterOption={initialFilters} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /filters/i }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(await screen.findByText("region.Europe")).toBeInTheDocument();
  });

  it("passes the selected filters to onFilter when Apply is clicked", async () => {
    const onFilter = vi.fn();
    const user = userEvent.setup();
    render(<Filter onFilter={onFilter} filterOption={initialFilters} />);

    fireEvent.click(screen.getByRole("button", { name: /filters/i }));
    const europe = await screen.findByText("region.Europe");
    await user.click(europe);
    await user.click(screen.getByRole("button", { name: "apply" }));

    expect(onFilter).toHaveBeenCalledWith(
      expect.objectContaining({ region: ["Europe"] })
    );
  });

  it("narrows the other categories (cascading) when a region is picked", async () => {
    const user = userEvent.setup();
    render(<Filter onFilter={() => {}} filterOption={initialFilters} />);

    fireEvent.click(screen.getByRole("button", { name: /filters/i }));
    const dialog = await screen.findByRole("dialog");

    // Initially both sub-regions are offered.
    expect(
      await within(dialog).findByText("subRegion.South America")
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText("subRegion.Western Europe")
    ).toBeInTheDocument();

    // Pick the Europe region.
    await user.click(within(dialog).getByText("region.Europe"));

    // The Americas-only sub-region is gone; the European one remains.
    expect(
      within(dialog).queryByText("subRegion.South America")
    ).not.toBeInTheDocument();
    expect(
      within(dialog).getByText("subRegion.Western Europe")
    ).toBeInTheDocument();
  });
});
