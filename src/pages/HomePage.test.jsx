import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k) => k.replace(/^country\./, ""),
    i18n: { language: "en" },
  }),
}));

const makeCountry = (name, region, subregion, code) => ({
  name,
  alpha3Code: code,
  flags: { png: "" },
  population: 1000,
  region,
  subregion,
  capital: "Capital",
  timezones: ["UTC+01:00"],
  unMember: true,
  languages: [],
});

vi.mock("../utils/fetchCountries", () => ({
  fetchCountries: vi.fn(() =>
    Promise.resolve([
      makeCountry("France", "Europe", "Western Europe", "FRA"),
      makeCountry("Germany", "Europe", "Western Europe", "DEU"),
      makeCountry("Brazil", "Americas", "South America", "BRA"),
    ])
  ),
}));

const renderHome = () =>
  render(
    <MemoryRouter initialEntries={["/en"]}>
      <HomePage />
    </MemoryRouter>
  );

describe("HomePage filtering", () => {
  it("renders all countries initially", async () => {
    renderHome();
    expect(await screen.findByText("France")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText("Brazil")).toBeInTheDocument();
  });

  it("narrows the list when a region filter is applied", async () => {
    const user = userEvent.setup();
    renderHome();
    await screen.findByText("France");

    // open the filter popup
    fireEvent.click(screen.getByRole("button", { name: /filters/i }));

    // pick the Europe region inside the dialog
    const dialog = await screen.findByRole("dialog");
    const europe = await within(dialog).findByText("region.Europe");
    await user.click(europe);
    await user.click(within(dialog).getByRole("button", { name: "apply" }));

    // Brazil should be gone, the European countries should remain
    expect(await screen.findByText("France")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.queryByText("Brazil")).not.toBeInTheDocument();
  });
});
