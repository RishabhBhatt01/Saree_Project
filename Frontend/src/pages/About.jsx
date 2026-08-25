import { Link } from "react-router-dom";
function About() {
  return (
    <main className="bg-[#faf6f1] min-h-screen">
      {/* HERO */}

      <section className="bg-[#faf6f1] py-8 px-5 sm:py-12 sm:px-6 lg:py-24 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* MOBILE */}

          <div className="relative min-h-[500px] overflow-hidden rounded-2xl md:hidden">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
              alt="SAARÉE traditional saree"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-white/80"></div>

            <div className="relative z-10 h-full min-h-[500px] flex items-center p-6 sm:p-8">
              <div>
                <p className="text-[11px] sm:text-sm tracking-[0.3em] text-[#9b3d5c] font-medium">
                  ABOUT SAARÉE
                </p>

                <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-[#332525] leading-[1.15]">
                  Where Tradition
                  <br />
                  <span className="text-[#9b3d5c]">Meets Elegance</span>
                </h1>

                <p className="mt-5 text-sm sm:text-base text-[#665b57] leading-relaxed max-w-lg">
                  SAARÉE was created with one simple idea — to make timeless
                  Indian elegance accessible to every woman.
                </p>

                <p className="mt-3 text-sm sm:text-base text-[#665b57] leading-relaxed max-w-lg">
                  From traditional silk sarees to contemporary designer pieces,
                  every saree is carefully selected for its beauty, quality and
                  craftsmanship.
                </p>

                <div className="mt-6 w-12 h-[2px] bg-[#9b3d5c]"></div>
              </div>
            </div>
          </div>

          {/* LAPTOP / DESKTOP */}

          <div className="hidden md:grid md:grid-cols-[0.85fr_1.15fr] lg:grid-cols-[0.8fr_1.2fr] items-center">
            {/* TEXT */}

            <div className="relative z-10 bg-white px-8 py-10 lg:px-12 lg:py-14 xl:px-16 xl:py-16 shadow-sm">
              <p className="text-[11px] lg:text-sm tracking-[0.3em] text-[#9b3d5c] font-medium">
                ABOUT SAARÉE
              </p>

              <h1 className="mt-4 font-serif text-4xl lg:text-5xl xl:text-6xl text-[#332525] leading-[1.15]">
                Where Tradition
                <br />
                <span className="text-[#9b3d5c]">Meets Elegance</span>
              </h1>

              <p className="mt-6 text-sm lg:text-base xl:text-lg text-[#665b57] leading-relaxed max-w-xl">
                SAARÉE was created with one simple idea — to make timeless
                Indian elegance accessible to every woman.
              </p>

              <p className="mt-4 text-sm lg:text-base text-[#665b57] leading-relaxed max-w-xl">
                From traditional silk sarees to contemporary designer pieces,
                every saree is carefully selected for its beauty, quality and
                craftsmanship.
              </p>

              <div className="mt-8 w-14 h-[2px] bg-[#9b3d5c]"></div>
            </div>

            {/* IMAGE */}

            <div className="relative -ml-6 lg:-ml-12">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
                alt="SAARÉE traditional saree"
                className="w-full h-[480px] lg:h-[560px] xl:h-[620px] object-cover object-[center_15%] rounded-r-[80px] shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] text-[#9b3d5c] font-medium">
            OUR PHILOSOPHY
          </p>

          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#332525]">
            Every Saree Tells a Story
          </h2>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            A saree is more than just clothing. It carries tradition, memories
            and emotions. At SAARÉE, we believe every drape should make you feel
            confident, beautiful and connected to your roots.
          </p>
        </div>
      </section>

      {/* VALUES */}

      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] text-[#9b3d5c] font-medium">
              WHAT WE BELIEVE IN
            </p>

            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#332525]">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* VALUE 1 */}

            <div className="text-center p-8 rounded-2xl bg-[#faf6f1]">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#f5e6ea] text-[#9b3d5c] flex items-center justify-center text-2xl">
                ✦
              </div>

              <h3 className="mt-6 font-serif text-2xl text-[#332525]">
                Quality
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                We believe beautiful design begins with exceptional quality and
                craftsmanship.
              </p>
            </div>

            {/* VALUE 2 */}

            <div className="text-center p-8 rounded-2xl bg-[#faf6f1]">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#f5e6ea] text-[#9b3d5c] flex items-center justify-center text-2xl">
                ♡
              </div>

              <h3 className="mt-6 font-serif text-2xl text-[#332525]">
                Elegance
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                We celebrate timeless designs that never go out of style.
              </p>
            </div>

            {/* VALUE 3 */}

            <div className="text-center p-8 rounded-2xl bg-[#faf6f1]">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#f5e6ea] text-[#9b3d5c] flex items-center justify-center text-2xl">
                ◇
              </div>

              <h3 className="mt-6 font-serif text-2xl text-[#332525]">
                Tradition
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                We honour India's rich textile heritage while embracing modern
                fashion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="px-5 sm:px-6 lg:px-10 py-10 lg:py-16">
        <div className="relative max-w-7xl mx-auto min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] overflow-hidden rounded-2xl">
          {/* Background Image */}

          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80"
            alt="SAARÉE saree collection"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}

          <div className="absolute inset-0 bg-[#332525]/65"></div>

          {/* Content */}

          <div className="relative z-10 min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] flex items-center justify-center px-6">
            <div className="text-center text-white max-w-2xl">
              <p className="text-[10px] sm:text-xs tracking-[0.35em] text-white/80 uppercase">
                Discover SAARÉE
              </p>

              <div className="w-12 h-px bg-white/70 mx-auto mt-4 mb-6"></div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
                Find Your Perfect Saree
              </h2>

              <p className="mt-5 text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed max-w-xl mx-auto">
                Explore timeless designs, beautiful craftsmanship and sarees
                created for the moments you'll always remember.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center mt-8 px-8 py-3.5 bg-white text-[#9b3d5c] rounded-full font-medium text-sm tracking-wide shadow-lg hover:bg-[#9b3d5c] hover:text-white transition-all duration-300"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
