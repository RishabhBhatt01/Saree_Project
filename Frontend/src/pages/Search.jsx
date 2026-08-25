import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";

function Search() {
  const [query, setQuery] = useState("");

const filteredProducts = products.filter((product) => {
  const searchText = query.toLowerCase().trim();

  return (
    product.name.toLowerCase().includes(searchText) ||
    product.category.toLowerCase().includes(searchText) ||
    (product.badge &&
      product.badge.toLowerCase().includes(searchText))
  );
});

  return (
    <main className="min-h-screen bg-[#faf6f1] py-16 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center">

          <p className="text-sm tracking-[0.3em] text-[#9b3d5c]">
            SAARÉE
          </p>

          <h1 className="mt-3 font-serif text-5xl text-[#332525]">
            Search Sarees
          </h1>

        </div>


        {/* SEARCH BAR */}

        <div className="max-w-2xl mx-auto mt-10">

          <input
            type="text"
            placeholder="Search sarees..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-full border border-gray-200 bg-white outline-none focus:border-[#9b3d5c] text-gray-700"
          />

        </div>


        {/* RESULTS */}

        <div className="mt-12">

          {query.trim() === "" ? (

            <div className="text-center py-10">

              <p className="text-gray-500">
                Search for your favourite saree.
              </p>

            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="text-center py-20">

              <h2 className="font-serif text-3xl text-[#332525]">
                No Sarees Found
              </h2>

              <p className="mt-3 text-gray-500">
                Try another search.
              </p>

            </div>

          ) : (

            <>

              <p className="mb-8 text-gray-600">
                {filteredProducts.length} Sarees Found
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {filteredProducts.map((product) => (

                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
                  >

                    {/* IMAGE */}

                    <div className="overflow-hidden">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
                      />

                    </div>


                    {/* DETAILS */}

                    <div className="p-5">

                      <p className="text-xs tracking-widest uppercase text-[#9b3d5c]">
                        {product.category}
                      </p>

                      <h2 className="mt-2 font-serif text-2xl text-[#332525]">
                        {product.name}
                      </h2>

                      <p className="mt-4 text-lg font-semibold text-[#332525]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>

                    </div>

                  </Link>

                ))}

              </div>

            </>

          )}

        </div>

      </div>

    </main>
  );
}

export default Search;