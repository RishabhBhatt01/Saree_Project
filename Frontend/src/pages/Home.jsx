import ProductCard from "../components/ProductCard";
// import Footer from "../components/Footer";
import products from "../data/products";
import { Link } from "react-router-dom";

// One saree from each collection
const goldenZari = products.find(
  (product) => product.category === "Banarasi Raw Silk",
);

const mashruKatan = products.find(
  (product) => product.category === "Handloom Mashru Katan",
);

const korasilk = products.find(
  (product) => product.category === "Banarasi Korasilk",
);

// Featured = 1 saree from each category
const featuredProducts = [goldenZari, mashruKatan, korasilk];

// Best sellers
const bestSellers = products.filter(
  (product) => product.badge === "BESTSELLER",
);

function Home() {
  return (
    <main>
      {/* HERO */}

      <section
        className="relative min-h-[calc(100vh-80px)] overflow-hidden
 bg-[#faf6f1] bg-[url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80')] bg-center bg-cover
    lg:bg-none"
      >
        {/* Mobile background overlay */}
        <div className="absolute inset-0 bg-white/75 lg:hidden"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 min-h-[calc(100vh-80px)]">
          <div className="grid lg:grid-cols-2 items-center min-h-[calc(100vh-80px)] gap-12">
            {/* LEFT CONTENT */}

            <div className="py-16 lg:py-0">
              <p className="text-sm tracking-[0.3em] text-[#9b3d5c] font-medium mb-6">
                TIMELESS • ELEGANT • TRADITIONAL
              </p>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-[#332525]">
                Elegance
                <br />
                <span className="text-[#9b3d5c]">in Every Thread</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg text-gray-600 leading-relaxed">
                Discover beautiful sarees crafted for every occasion.
              </p>

              <Link
                to="/shop"
                className="inline-block mt-8 bg-[#9b3d5c] text-white px-8 py-4 rounded-full tracking-wider font-medium hover:bg-[#7b2949] transition duration-300  "
              >
                SHOP NOW
              </Link>
            </div>

            {/* RIGHT IMAGE - Desktop only */}

            <div className="relative hidden lg:flex justify-end">
              <div className="relative w-full max-w-lg">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#e8cfd6] rounded-full blur-3xl opacity-60" />

                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
                  alt="Elegant Indian Saree"
                  className=" relative w-full h-[620px] object-cover rounded-t-[250px] rounded-b-[30px] shadow-2xl"
                />

                <div className="absolute bottom-8 -left-5 bg-white px-6 py-4 rounded-xl shadow-lg">
                  <p className="text-xs tracking-widest text-gray-500 uppercase">
                    New Collection
                  </p>

                  <p className="mt-1 text-lg font-serif text-[#7b2949]">
                    Festive Collection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}

      <section className="bg-white py-5 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}

          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] text-[#9b3d5c] font-medium">
              OUR COLLECTION
            </p>

            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#332525]">
              Featured Sarees
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              One beautiful saree from each of our signature collections.
            </p>
          </div>

          {/* Products */}

          <div className="flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="w-[82vw] sm:w-auto shrink-0 snap-center"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}

      <section className="bg-[#faf6f1] py-10 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}

          <div className="text-center mb-10 md:mb-12">
            <p className="text-sm tracking-[0.3em] text-[#9b3d5c] font-medium">
              OUR SIGNATURE COLLECTIONS
            </p>

            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#332525]">
              Explore Our Sarees
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Discover authentic handloom sarees crafted with traditional
              artistry and timeless elegance.
            </p>
          </div>

          {/* COLLECTION CARDS */}

          <div className="flex overflow-x-auto gap-5 pb-5 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
            {/* GOLDEN ZARI */}

            <div className="group relative min-w-[82%] sm:min-w-[55%] md:min-w-0 h-[450px] sm:h-[480px] overflow-hidden rounded-2xl snap-center">
              <img
                src="/images/sarees/golden-zari-04.jpeg"
                alt="Banarasi Pure Raw Silk Golden Zari Saree"
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition"></div>

              <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
                <p className="text-sm tracking-widest opacity-80">
                  01 • 10 DESIGNS
                </p>

                <h3 className="mt-2 font-serif text-3xl">Golden Zari</h3>

                <p className="mt-2 text-sm opacity-90">
                  Pure Raw Silk with Golden Zari Buti & Mina
                </p>

                <p className="mt-3 font-medium">₹4,100</p>

                <Link
                  to={`/shop?category=${encodeURIComponent("Banarasi Raw Silk")}`}
                  className="inline-block mt-5 text-sm tracking-wider border-b border-white pb-1"
                >
                  EXPLORE COLLECTION →
                </Link>
              </div>
            </div>

            {/* MASHRU KATAN */}

            <div className="group relative min-w-[82%] sm:min-w-[55%] md:min-w-0 h-[450px] sm:h-[480px] overflow-hidden rounded-2xl snap-center">
              <img
                src="/images/sarees/katan-08.jpeg"
                alt="Handloom Mashru Katan Silk Saree"
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition"></div>

              <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
                <p className="text-sm tracking-widest opacity-80">
                  02 • 14 DESIGNS
                </p>

                <h3 className="mt-2 font-serif text-3xl">Mashru Katan</h3>

                <p className="mt-2 text-sm opacity-90">
                  Handloom Mashru Katan Silk Khaddi Banarasi
                </p>

                <p className="mt-3 font-medium">₹4,100</p>

                <Link
                  to={`/shop?category=${encodeURIComponent("Handloom Mashru Katan")}`}
                  className="inline-block mt-5 text-sm tracking-wider border-b border-white pb-1"
                >
                  EXPLORE COLLECTION →
                </Link>
              </div>
            </div>

            {/* KORASILK */}

            <div className="group relative min-w-[82%] sm:min-w-[55%] md:min-w-0 h-[450px] sm:h-[480px] overflow-hidden rounded-2xl snap-center">
              <img
                src="/images/sarees/r7200-01.jpeg"
                alt="Pure Handloom Banarasi Korasilk Saree"
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition"></div>

              <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
                <p className="text-sm tracking-widest opacity-80">
                  03 • 23 DESIGNS
                </p>

                <h3 className="mt-2 font-serif text-3xl">
                  Pure Handloom Korasilk
                </h3>

                <p className="mt-2 text-sm opacity-90">
                  Kaduwa Zari • Antique Zari • Handloom Work
                </p>

                <p className="mt-3 font-medium">₹7,200</p>

                <Link
                  to={`/shop?category=${encodeURIComponent("Banarasi Korasilk")}`}
                  className="inline-block mt-5 text-sm tracking-wider border-b border-white pb-1"
                >
                  EXPLORE COLLECTION →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}

      <section className="bg-white py-10 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}

          <div className="text-center mb-10 md:mb-14">
            <p className="text-sm tracking-[0.3em] text-[#9b3d5c] font-medium">
              THE SAARÉE PROMISE
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-[#332525]">
              Why Choose Us?
            </h2>
          </div>

          {/* Features */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Feature 1 */}

            <div className="text-center p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-[#faf6f1] transition duration-300">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-full bg-[#f5e6ea] text-[#9b3d5c] text-xl sm:text-2xl">
                ✦
              </div>

              <h3 className="mt-4 sm:mt-5 lg:mt-6 font-serif text-lg sm:text-xl lg:text-2xl text-[#332525]">
                Premium Quality
              </h3>

              <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                Carefully selected fabrics and craftsmanship you can trust.
              </p>
            </div>

            {/* Feature 2 */}

            <div className="text-center p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-[#faf6f1] transition duration-300">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-full bg-[#f5e6ea] text-[#9b3d5c] text-xl sm:text-2xl">
                ◇
              </div>

              <h3 className="mt-4 sm:mt-5 lg:mt-6 font-serif text-lg sm:text-xl lg:text-2xl text-[#332525]">
                Authentic Designs
              </h3>

              <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                Traditional craftsmanship combined with modern elegance.
              </p>
            </div>

            {/* Feature 3 */}

            <div className="text-center p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-[#faf6f1] transition duration-300">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-full bg-[#f5e6ea] text-[#9b3d5c] text-xl sm:text-2xl">
                ♡
              </div>

              <h3 className="mt-4 sm:mt-5 lg:mt-6 font-serif text-lg sm:text-xl lg:text-2xl text-[#332525]">
                Made With Love
              </h3>

              <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                Every saree is chosen with care to make your special moments
                memorable.
              </p>
            </div>

            {/* Feature 4 */}

            <div className="text-center p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl hover:bg-[#faf6f1] transition duration-300">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-full bg-[#f5e6ea] text-[#9b3d5c] text-xl sm:text-2xl">
                ✓
              </div>

              <h3 className="mt-4 sm:mt-5 lg:mt-6 font-serif text-lg sm:text-xl lg:text-2xl text-[#332525]">
                Secure Shopping
              </h3>

              <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                Safe checkout and reliable delivery right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}

      <section className="bg-[#faf6f1] py-10 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}

          <div className="text-center mb-10 md:mb-12">
            <p className="text-sm tracking-[0.3em] text-[#9b3d5c] font-medium">
              CUSTOMER FAVOURITES
            </p>

            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#332525]">
              Best Sellers
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Our most loved sarees, chosen by women across India.
            </p>
          </div>

          {/* Products */}

          <div className="flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="w-[82vw] sm:w-auto shrink-0 snap-center"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* View All */}

          <div className="flex justify-center mt-10 md:mt-12">
            <Link
              to="/shop"
              className="border border-[#9b3d5c] text-[#9b3d5c] px-8 py-3 rounded-full font-medium tracking-wide hover:bg-[#9b3d5c] hover:text-white transition duration-300"
            >
              VIEW ALL SAREES
            </Link>
          </div>
        </div>
      </section>
    </main>
    //     <Footer />
    //   </>
  );
}

export default Home;
