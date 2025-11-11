import { describe, test } from "vitest";
import { heroApi } from "./hero.api";

describe("Hero API", () => {
  test("Should be configure pointing to the testing server", () => {
    console.log(heroApi.defaults.baseURL);
  });
});
