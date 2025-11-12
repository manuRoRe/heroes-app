import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.routes";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";
import { render, screen } from "@testing-library/react";

//Mokcs de admin
vi.mock("@/admin/pages/AdminPage", () => ({
  AdminPage: () => <div data-testid="admin-page"></div>,
}));

vi.mock("@/admin/admin/AdminLayout", () => ({
  AdminLayout: () => (
    <div data-testid="admin-layout">
      <Outlet></Outlet>
    </div>
  ),
}));

//Mocks de Heroes
vi.mock("@/heroes/layouts/HeroesLayout", () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      <Outlet></Outlet>
    </div>
  ),
}));

vi.mock("@/heroes/pages/home/HomePage", () => ({
  HomePage: () => <div data-testid="home-page"></div>,
}));

vi.mock("@/heroes/pages/hero/HeroPage", () => ({
  HeroPage: () => {
    const { idSlug = "" } = useParams();

    return <div data-testid="hero-page">HeroPage - {idSlug}</div>;
  },
}));

vi.mock("@/heroes/pages/search/SearchPage", () => ({
  default: () => <div data-testid="search-page"></div>,
}));

describe("appRouter", () => {
  test("should be configured as expected", () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  test("should render home page at root path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("home-page")).toBeDefined();
  });

  test("should render hero page at /heroes/:idSlug path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/heroes/superman"],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("hero-page").innerHTML).toContain("superman");
  });

  test("should render search page at /search path", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/search"],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId("search-page")).toBeDefined();
  });

  test("should render admin page at /admin path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/admin"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("admin-page")).toBeDefined();
  });

  test("should redirect to HomePage for unknown pages", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/paginaMala"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("home-page")).toBeDefined();
  });
});
