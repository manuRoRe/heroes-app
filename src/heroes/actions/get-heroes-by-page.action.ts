import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../interfaces/get-heroes.response";

export const getHeroesByPageAction = async (): Promise<HeroesResponse> => {
  const { data } = await heroApi.get<HeroesResponse>("/");

  console.log({ data });

  return data;
};
