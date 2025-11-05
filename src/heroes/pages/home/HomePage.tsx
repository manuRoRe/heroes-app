import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useMemo } from "react";

import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? 6;

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];

    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  /*  const [activeTab, setActiveTab] = useState<
    "all" | "favorites" | "heroes" | "villains"
  >("all"); */

  const { data: dataHeroes } = useQuery({
    queryKey: ["heroes", { page, limit }],
    queryFn: () => getHeroesByPageAction(+page, +limit),
    staleTime: 1000 * 60 * 5, //! 5 minutes
  });

  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de SuperHeroes"
          description="Descubre, explora y administra superheroes y villanos"
        />

        <CustomBreadcrumbs currentPage="Superheroes"></CustomBreadcrumbs>

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  return prev;
                })
              }
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>

            <TabsTrigger
              value="favorites"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "favorites");
                  return prev;
                })
              }
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  return prev;
                })
              }
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  return prev;
                })
              }
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <h1>Todos los personajes</h1>
            <HeroGrid heroes={dataHeroes?.heroes ?? []}></HeroGrid>
          </TabsContent>

          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            <h1>Favoritos!!</h1>
            <HeroGrid heroes={dataHeroes?.heroes ?? []}></HeroGrid>
          </TabsContent>

          <TabsContent value="heroes">
            {/* Mostrar todos los Heroes */}
            <h1>Heroes</h1>
            <HeroGrid heroes={dataHeroes?.heroes ?? []}></HeroGrid>
          </TabsContent>

          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
            <h1>Villanos</h1>
            <HeroGrid heroes={dataHeroes?.heroes ?? []}></HeroGrid>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={dataHeroes?.pages ?? 1} />
      </>
    </>
  );
};
