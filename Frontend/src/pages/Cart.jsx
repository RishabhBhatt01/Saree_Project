import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf6f1] flex items-center justify-center px-6">

        <div className="text-center">

          <p className="text-sm tracking-[0.3em] text-[#9b3d5c]">
            SAARÉE CART
          </p>

          <h1 className="mt-3 font-serif text-5xl text-[#332525]">
            Your Cart is Empty
          </h1>

          <p className="mt-4 text-gray-600">
            Looks like you haven't added anything yet.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-8 bg-[#9b3d5c] text-white px-8 py-3 rounded-full hover:bg-[#7b2949] transition"
          >
            SHOP SAREES
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf6f1] py-16 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <p className="text-sm tracking-[0.3em] text-[#9b3d5c]">
            SAARÉE
          </p>

          <h1 className="mt-3 font-serif text-5xl text-[#332525]">
            Your Cart
          </h1>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* CART ITEMS */}

          <div className="lg:col-span-2 space-y-5">

            {cart.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 flex flex-col sm:flex-row gap-5"
              >

                {/* IMAGE */}

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-32 h-40 object-cover rounded-xl"
                />


                {/* DETAILS */}

                <div className="flex-1">

                  <p className="text-xs tracking-widest uppercase text-[#9b3d5c]">
                    {item.category}
                  </p>

                  <h2 className="mt-2 font-serif text-2xl text-[#332525]">
                    {item.name}
                  </h2>

                  <p className="mt-2 font-medium text-[#332525]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>


                  {/* QUANTITY */}

                  <div className="mt-5 flex items-center gap-3">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-9 h-9 rounded-full border border-gray-300 hover:border-[#9b3d5c] hover:text-[#9b3d5c]"
                    >
                      −
                    </button>

                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-9 h-9 rounded-full border border-gray-300 hover:border-[#9b3d5c] hover:text-[#9b3d5c]"
                    >
                      +
                    </button>

                  </div>

                </div>


                {/* RIGHT */}

                <div className="flex sm:flex-col justify-between items-end">

                  <p className="font-semibold text-lg text-[#332525]">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-gray-500 hover:text-[#9b3d5c] transition"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>


          {/* SUMMARY */}

          <div className="bg-white rounded-2xl p-7 h-fit">

            <h2 className="font-serif text-3xl text-[#332525]">
              Order Summary
            </h2>

            <div className="mt-7 space-y-4">

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>

                <span>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>

                <span className="text-[#9b3d5c]">
                  FREE
                </span>
              </div>

            </div>

            <div className="my-6 h-px bg-gray-200" />

            <div className="flex justify-between text-xl font-semibold text-[#332525]">

              <span>Total</span>

              <span>
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>

            </div>


            <Link
              to="/checkout"
              className="block text-center mt-7 w-full bg-[#9b3d5c] text-white py-4 rounded-full font-medium hover:bg-[#7b2949] transition"
            >
              PROCEED TO CHECKOUT
            </Link>


            <Link
              to="/shop"
              className="block text-center mt-4 text-[#9b3d5c] hover:underline"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Cart;