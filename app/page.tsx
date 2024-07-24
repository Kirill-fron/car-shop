import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from "@/components";
import { HomeProps } from "@types";
import { fuels,  yearsOfProduction } from "@constants";
import { fetchCars } from "@utils";

export default async function Home({searchParams}: HomeProps) {
  const allCars = await fetchCars({
    manufacturers: searchParams.manufacturers || '',
    year: searchParams.year || 2024,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div id="discover" className="mt-12 max-width padding-x padding-y">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>


            <ShowMore 
           pageNumber={(searchParams.limit || 10) / 10}
           isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl">Opps. no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
