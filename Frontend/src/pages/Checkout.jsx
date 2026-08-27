import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pin: "",
});

const [paymentMethod, setPaymentMethod] = useState("cod");

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    pin,
  } = formData;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !pin
  ) {
    alert("Please fill all delivery details.");
    return;
  }

  const order = {
    id: Date.now(),
    customer: formData,
    paymentMethod,
    items: cart,
    total: cartTotal,
    createdAt: new Date().toISOString(),
  };

  console.log("ORDER:", order);

  alert("Order placed successfully! 🎉");

  navigate("/");
};

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf6f1] flex items-center justify-center px-6">
        <div className="text-center">

          <h1 className="font-serif text-4xl text-[#332525]">
            Your Cart is Empty
          </h1>

          <Link
            to="/shop"
            className="inline-block mt-8 bg-[#9b3d5c] text-white px-8 py-3 rounded-full"
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
            SAARÉE CHECKOUT
          </p>

          <h1 className="mt-3 font-serif text-5xl text-[#332525]">
            Checkout
          </h1>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* CUSTOMER DETAILS */}

          <div className="lg:col-span-2 bg-white rounded-2xl p-8">

            <h2 className="font-serif text-3xl text-[#332525]">
              Delivery Information
            </h2>


            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >

              {/* NAME */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    First Name
                  </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#9b3d5c]"
                />
                </div>


                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Last Name
                  </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#9b3d5c]"
                />
                </div>

              </div>


              {/* EMAIL */}

              <div>

                <label className="block text-sm text-gray-600 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#9b3d5c]"
                />
              </div>


              {/* PHONE */}

              <div>

                <label className="block text-sm text-gray-600 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#9b3d5c]"
                />

              </div>


              {/* ADDRESS */}

              <div>

                <label className="block text-sm text-gray-600 mb-2">
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="House No, Street, Area"
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl outline-none resize-none focus:border-[#9b3d5c]"
                />

              </div>


              {/* CITY / STATE / PIN */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="px-5 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#9b3d5c]"
                />

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="px-5 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#9b3d5c]"
                />

                <input
                  type="text"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="PIN Code"
                  className="px-5 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#9b3d5c]"
                />

              </div>


              {/* PAYMENT */}

              <div className="pt-6 border-t border-gray-200">

                <h2 className="font-serif text-3xl text-[#332525]">
                  Payment Method
                </h2>


                <div className="mt-5 space-y-3">

                  <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-[#9b3d5c]">

                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />

                    <span className="text-gray-700">
                      Cash on Delivery
                    </span>

                  </label>


                  <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-[#9b3d5c]">

                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />

                    <span className="text-gray-700">
                      Online Payment
                    </span>

                  </label>

                </div>

              </div>


              <button
                type="submit"
                className="w-full bg-[#9b3d5c] text-white py-4 rounded-full font-medium tracking-wide hover:bg-[#7b2949] transition"
              >
                PLACE ORDER
              </button>

            </form>

          </div>


          {/* ORDER SUMMARY */}

          <div className="bg-white rounded-2xl p-7 h-fit">

            <h2 className="font-serif text-3xl text-[#332525]">
              Your Order
            </h2>


            <div className="mt-6 space-y-5">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-4"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">

                    <h3 className="font-serif text-lg text-[#332525]">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>

                    <p className="mt-2 font-medium">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>

              ))}

            </div>


            <div className="my-6 h-px bg-gray-200" />


            <div className="flex justify-between text-lg font-semibold text-[#332525]">

              <span>Total</span>

              <span>
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Checkout;