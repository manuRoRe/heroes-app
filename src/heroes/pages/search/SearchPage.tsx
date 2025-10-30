import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Busqueda de Superheroes"
        description="Search for a character"
      />

      <CustomBreadcrumbs
        currentPage="Buscador"
        /* breadcrumbs={[
          { label: "Inicio", to: "/" },
          { label: "Inicio2", to: "/" },
        ]} */
      ></CustomBreadcrumbs>

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Search Controls */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
