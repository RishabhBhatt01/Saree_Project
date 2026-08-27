import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("search") || "";

  const [sort, setSort] = useState("default");

  const search = urlSearch;

  const categories = [
    "All",
    "Banarasi Raw Silk",
    "Handloom Mashru Katan",
    "Banarasi Korasilk",
  ];

  // CATEGORY FILTER

  const handleCategory = (item) => {
    if (item === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: item,
      });
    }
  };

  // SEARCH

  const handleSearch = (e) => {
    const value = e.target.value;

    if (value.trim() === "") {
      if (category === "All") {
        setSearchParams({});
      } else {
        setSearchParams({
          category: category,
        });
      }
    } else {
      setSearchParams({
        search: value,
      });
    }
  };

  // FILTER + SORT

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // CATEGORY

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // SEARCH

    if (search.trim() !== "") {
      const searchText = search.toLowerCase().trim();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText) ||
          product.category.toLowerCase().includes(searchText) ||
          product.description.toLowerCase().includes(searchText)
      );
    }

    // SORT

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [category, search, sort]);

  return (
    <main className="min-h-screen bg-[#faf6f1]">

      {/* HEADER */}

      <section className="bg-white px-5 py-8 sm:px-6 sm:py-10 lg:py-12">

        <div className="max-w-7xl mx-auto text-center">

          <p className="text-[11px] sm:text-sm tracking-[0.3em] text-[#9b3d5c] font-medium">
            OUR COLLECTION
          </p>

          <h1 className="mt-3 font-serif text-3xl sm:text-5xl md:text-6xl text-[#332525]">
            Shop Sarees
          </h1>

          <p className="mt-4 sm:mt-5 max-w-2xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
            Discover our carefully curated collection of elegant
            handloom and Banarasi sarees.
          </p>

        </div>

      </section>


      {/* FILTERS */}

      <section className="px-5 pt-6 sm:px-6 sm:pt-8">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-5">


            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search sarees..."
              value={search}
              onChange={handleSearch}
              className="w-full lg:w-80 px-5 py-3 text-sm rounded-full border border-gray-200 bg-white outline-none focus:border-[#9b3d5c]"
            />


            {/* CATEGORIES */}

            <div className="flex-1 min-w-0">

              <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">

                {categories.map((item) => (

                  <button
                    key={item}
                    onClick={() => handleCategory(item)}
                    className={`shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm transition ${
                      category === item && search === ""
                        ? "bg-[#9b3d5c] text-white"
                        : "bg-white text-gray-600 hover:bg-[#f5e6ea]"
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>


            {/* SORT */}

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full lg:w-auto px-5 py-3 text-sm rounded-full border border-gray-200 bg-white outline-none cursor-pointer"
            >

              <option value="default">
                Sort By
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

            </select>

          </div>

        </div>

      </section>


      {/* PRODUCTS */}

      <section className="px-4 py-6 sm:px-6 sm:py-8">

        <div className="max-w-7xl mx-auto">


          {/* RESULT COUNT */}

          <div className="mb-5 sm:mb-8">

            <p className="text-xs sm:text-sm text-gray-600">

              {search
                ? `Search results for "${search}" — ${filteredProducts.length} Sarees`
                : `Showing ${filteredProducts.length} Sarees`}

            </p>

          </div>


          {/* PRODUCTS */}

          {filteredProducts.length > 0 ? (

            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          ) : (

            /* EMPTY STATE */

            <div className="text-center py-20 sm:py-24">

              <h2 className="font-serif text-2xl sm:text-3xl text-[#332525]">
                No Sarees Found
              </h2>

              <p className="mt-3 text-sm sm:text-base text-gray-600">
                No sarees match your search.
              </p>

              <button
                onClick={() => {
                  setSort("default");
                  setSearchParams({});
                }}
                className="mt-6 bg-[#9b3d5c] text-white px-6 sm:px-7 py-3 rounded-full text-sm hover:bg-[#7b2949] transition"
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Shop;