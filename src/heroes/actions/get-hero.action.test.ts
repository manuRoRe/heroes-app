import { describe, expect, test } from "vitest";
import { getHero } from "./get-hero.action";

describe("getHeroAction", () => {
  test("should fetch hero data and return with complete image url", async () => {
    const data = await getHero("harley-quinn");

    expect(data).toStrictEqual({
      id: "37",
      name: "Harley Quinn",
      slug: "harley-quinn",
      alias: "Clown Princess of Crime",
      powers: [
        "Agilidad acrobática",
        "Habilidades de combate",
        "Armas personalizadas",
        "Imprevisibilidad",
        "Carisma manipulador",
        "Resistencia al dolor",
        "Intelecto criminal",
      ],
      description:
        "La antigua Dra. Harleen Quinzel, una psicóloga prometedora que se obsesionó con el Joker durante su internado en Arkham Asylum. Su amor por el Príncipe Payaso del Crimen la llevó a adoptar la identidad de Harley Quinn, convirtiéndose en su compañera y luego en una villana independiente. Conocida por su versatilidad, carisma y perspectiva alegre pero perturbada de la vida, Harley se ha convertido en una de las villanas más populares del Universo DC.",
      strength: 6,
      intelligence: 7,
      speed: 7,
      durability: 6,
      team: "Suicide Squad",
      image: "http://localhost:3005/images/37.jpeg",
      firstAppearance: "1992",
      status: "Active",
      category: "Villain",
      universe: "DC",
    });

    expect(data.image).toContain("http");
  });
  test("should throw an error if the hero is not found", async () => {
    /* try {
      await getHero("asdasdasd");
    } catch (e) {
      expect(e).toBeDefined();
    } */

    await getHero("asdasdasd").catch((e) => {
      expect(e).toBeDefined();
      expect(e.message).toBe("Request failed with status code 404");
    });
  });
});
