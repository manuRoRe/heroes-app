import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Busqueda de Superheroes"
        description="Search for a character"
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Search Controls */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
