import { use } from "react";
import type { Hero } from "../interfaces/hero.interface";

import {
  FavoriteHeroContext,
  FavoriteHeroProvider,
} from "./FavoriteHeroContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";

const mockHero = {
  id: "1",
  name: "superman",
} as Hero;

const TestComponent = () => {
  const { favoriteCount, favorites, isFavorite, toggleFavorite } =
    use(FavoriteHeroContext);

  return (
    <div>
      <div data-testid="favorite-count">{favoriteCount}</div>
      <div data-testid="favorite-list">
        {favorites.map((hero) => (
          <div key={hero.id} data-testid={`hero-${hero.id}`}>
            {hero.name}
          </div>
        ))}
      </div>

      <button
        data-testid="toggle-favorite"
        onClick={() => {
          toggleFavorite(mockHero);
        }}
      >
        Toggle Favorite
      </button>

      <div data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
    </div>
  );
};

const renderContetTest = () => {
  return render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>
  );
};

describe("FavoriteHeroContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should initialize with deafult values", () => {
    renderContetTest();

    expect(screen.getByTestId("favorite-count").innerHTML).toBe("0");
    expect(screen.getByTestId("favorite-list").children.length).toBe(0);
  });

  test("should add and remove Hero to favorites when toggleHero is called", () => {
    renderContetTest();

    const btToggleFavorite = screen.getByTestId("toggle-favorite");
    //Comprobamos que el heroe se guatda en favoritos al pulsar el botón
    fireEvent.click(btToggleFavorite);

    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("superman");
    expect(localStorage.getItem("favorites")).toBe(
      '[{"id":"1","name":"superman"}]'
    );
    expect(screen.getByTestId("favorite-count").innerHTML).toBe("1");

    //Comprobamos que el heroe se quita de favoritos al volver a pulsar el boton
    fireEvent.click(btToggleFavorite);

    expect(screen.getByTestId("is-favorite").textContent).toBe("false");
    expect(localStorage.getItem("favorites")).toBeUndefined;
    expect(screen.getByTestId("favorite-count").innerHTML).toBe("0");
  });
});
