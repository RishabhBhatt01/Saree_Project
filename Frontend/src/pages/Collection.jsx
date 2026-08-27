import { Link } from "react-router-dom";

function Collections() {
  const collections = [
    {
      id: 1,
      name: "Golden Zari",
      description:
        "Banarasi Pure Raw Silk sarees with beautiful golden zari buti and mina work.",
      count: "10 Designs",
      price: "₹4,100",
      category: "Banarasi Raw Silk",
      image: "/images/sarees/golden-zari-01.jpeg",
    },

    {
      id: 2,
      name: "Mashru Katan",
      description:
        "Banarasi Handloom Mashru Katan Silk Khaddi sarees with a soft fabric and pure Katan feel.",
      count: "14 Designs",
      price: "₹4,100",
      category: "Handloom Mashru Katan",
      image: "/images/sarees/katan-04.jpeg",
    },

    {
      id: 3,
      name: "Pure Handloom Korasilk",
      description:
        "Pure Handloom Banarasi Korasilk sarees featuring Kaduwa zari, antique zari and traditional handloom work.",
      count: "23 Designs",
      price: "₹7,200",
      category: "Banarasi Korasilk",
      image: "/images/sarees/r7200-01.jpeg",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf6f1]">

      {/* HEADER */}

      <section className="bg-white py-5 px-6">

        <div className="max-w-4xl mx-auto text-center">

          <p className="text-sm tracking-[0.3em] text-[#9b3d5c] font-medium">
            SAARÉE COLLECTIONS
          </p>

          <h1 className="mt-4 font-serif text-5xl md:text-6xl text-[#332525]">
            Discover Our Collections
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Explore our carefully selected Banarasi sarees,
            crafted with traditional artistry and timeless elegance.
          </p>

        </div>

      </section>


      {/* COLLECTIONS */}

      <section className="py-5 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {collections.map((collection) => (

              <div
                key={collection.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
              >

                {/* IMAGE */}

                <div className="relative h-[450px] overflow-hidden">

                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

                  {/* DESIGN COUNT */}

                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <p className="text-xs tracking-widest text-[#9b3d5c] font-medium uppercase">
                      {collection.count}
                    </p>
                  </div>

                </div>


                {/* CONTENT */}

                <div className="p-7">

                  <h2 className="font-serif text-3xl text-[#332525]">
                    {collection.name}
                  </h2>

                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {collection.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <p className="text-lg font-semibold text-[#332525]">
                      From {collection.price}
                    </p>

                  </div>

                  <Link
                    to={`/shop?category=${encodeURIComponent(
                      collection.category
                    )}`}
                    className="inline-block mt-6 text-[#9b3d5c] font-medium tracking-wide border-b border-[#9b3d5c] pb-1 hover:text-[#7b2949] transition"
                  >
                    EXPLORE COLLECTION →
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Collections;