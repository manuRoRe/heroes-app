import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren, ReactElement } from "react";

vi.mock("../ui/button", () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

const renderWithRouter = (
  component: ReactElement,
  initialEntries?: string[]
) => {
  render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
  );
};

describe("CustomPagination", () => {
  test("should render components with default values", () => {
    renderWithRouter(<CustomPagination totalPages={5}></CustomPagination>);

    expect(screen.getByText("Anterior")).toBeDefined();
    expect(screen.getByText("Siguiente")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("4")).toBeDefined();
    expect(screen.getByText("5")).toBeDefined();
  });

  test("should disabled previous button when page 1 is selected", () => {
    renderWithRouter(<CustomPagination totalPages={5}></CustomPagination>);

    const prevButton = screen.getByText("Anterior");

    expect(prevButton.getAttributeNames()).toContain("disabled");
  });

  test("should disabled next button when page is the latest", () => {
    renderWithRouter(<CustomPagination totalPages={5}></CustomPagination>, [
      "/?page=5",
    ]);

    const nextButton = screen.getByText("Siguiente");

    expect(nextButton.getAttributeNames()).toContain("disabled");
  });

  test("should disabled button 3 when page 3 is selected", () => {
    renderWithRouter(<CustomPagination totalPages={5}></CustomPagination>, [
      "/?page=3",
    ]);

    const index3Button = screen.getByText("3");
    const index2Button = screen.getByText("2");

    expect(index3Button.getAttribute("variant")).toBe("default");
    //Mostrando que los demas si se muestran como no seleccionados
    expect(index2Button.getAttribute("variant")).toBe("outline");
  });

  test("should change to page 3 when button 3 is clicked", () => {
    renderWithRouter(<CustomPagination totalPages={5}></CustomPagination>);

    const index3Button = screen.getByText("3");

    expect(index3Button.getAttribute("variant")).toBe("outline");

    fireEvent.click(index3Button);

    expect(index3Button.getAttribute("variant")).toBe("default");
  });
});
