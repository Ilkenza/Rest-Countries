import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("Pagination", () => {
  it("renders nothing when there is only one page", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the current/total page indicator", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
    );
    // Text is split across nodes: "page 2 of 5"
    expect(screen.getByText(/page/)).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  it("disables the previous button on the first page", () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).not.toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    render(
      <Pagination currentPage={3} totalPages={3} onPageChange={() => {}} />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons[1]).toBeDisabled();
  });
});
