import { beforeEach, describe, expect, test } from "vitest";
import { getHeroesByPageAction } from "./get-heroes-by-page.action";
import AxiosMockAdapter from "axios-mock-adapter";
import { heroApi } from "../api/hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;

describe("getHeroesByPageAction", () => {
  const heroApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => heroApiMock.reset());

  test("should return a list of heroes", async () => {
    heroApiMock.onGet("/").reply(200, {
      total: 10,
      pages: 2,
      heroes: [{ image: "1.png" }, { image: "2.png" }],
    });

    const response = await getHeroesByPageAction(1);

    expect(response).toStrictEqual({
      total: 10,
      pages: 2,
      heroes: [
        { image: `${BASE_URL}/images/1.png` },
        { image: `${BASE_URL}/images/2.png` },
      ],
    });
  });

  test("should return the correct list of heroes when page is not a number", async () => {
    const responseObject = {
      total: 10,
      pages: 2,
      heroes: [],
    };

    heroApiMock.onGet("/").reply(200, responseObject);

    await getHeroesByPageAction("abs" as unknown as number);

    const params = heroApiMock.history.get[0].params;
    expect(params).toStrictEqual({
      offset: 0,
      limit: 6,
      category: "all",
    });
  });

  test("should return the correct list of heroes when page is a String number", async () => {
    const responseObject = {
      total: 10,
      pages: 2,
      heroes: [],
    };

    heroApiMock.onGet("/").reply(200, responseObject);

    await getHeroesByPageAction("5" as unknown as number);

    const params = heroApiMock.history.get[0].params;
    expect(params).toStrictEqual({
      offset: 24,
      limit: 6,
      category: "all",
    });
  });

  test("should return the correct list of heroes when page is a String number", async () => {
    const responseObject = {
      total: 10,
      pages: 2,
      heroes: [],
    };

    heroApiMock.onGet("/").reply(200, responseObject);

    await getHeroesByPageAction(2, 10, "Villains");

    const params = heroApiMock.history.get[0].params;
    expect(params).toStrictEqual({
      offset: 10,
      limit: 10,
      category: "Villains",
    });
  });
});
