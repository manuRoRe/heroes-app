import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Busqueda de Superheroes"
        description="Search for a character"
      />

      <HeroStats />
    </>
  );
};

export default SearchPage;
