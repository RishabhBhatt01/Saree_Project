import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <main className="min-h-screen bg-[#faf6f1] flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl p-10 md:p-14 text-center max-w-lg w-full shadow-sm">

        <div className="mx-auto w-20 h-20 rounded-full bg-[#f5e6ea] flex items-center justify-center text-[#9b3d5c] text-4xl">
          ✓
        </div>

        <p className="mt-8 text-sm tracking-[0.3em] text-[#9b3d5c]">
          ORDER CONFIRMED
        </p>

        <h1 className="mt-4 font-serif text-4xl text-[#332525]">
          Thank You!
        </h1>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Your order has been placed successfully.
          We will send you the order details shortly.
        </p>

        <div className="mt-8 p-4 bg-[#faf6f1] rounded-xl">

          <p className="text-sm text-gray-500">
            Order Number
          </p>

          <p className="mt-1 font-semibold text-[#332525]">
            #SAAREE-{Math.floor(100000 + Math.random() * 900000)}
          </p>

        </div>

        <Link
          to="/shop"
          className="inline-block mt-8 bg-[#9b3d5c] text-white px-8 py-3 rounded-full hover:bg-[#7b2949] transition"
        >
          CONTINUE SHOPPING
        </Link>

      </div>

    </main>
  );
}

export default OrderSuccess;