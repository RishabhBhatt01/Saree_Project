import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register-user",
        { username, email, password },
        { withCredentials: true }
      );

      console.log(response.data);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed"
      );

      console.log(error);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#faf6f1]">
      <div className="min-h-[calc(100vh-80px)] grid lg:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="hidden lg:block relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
            alt="Elegant saree"
            className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#332525]/35"></div>

          {/* Image Content */}
          <div className="absolute inset-0 flex items-end p-12 xl:p-16">
            <div className="text-white max-w-md">
              <p className="text-xs tracking-[0.35em] font-medium">
                JOIN ThreadSutra
              </p>

              <h2 className="mt-4 font-serif text-4xl xl:text-5xl leading-tight">
                Your journey
                <br />
                into timeless elegance.
              </h2>

              <p className="mt-5 text-sm text-white/80 leading-relaxed">
                Create an account to save your favourites, track your orders
                and discover sarees made for your special moments.
              </p>
            </div>
          </div>
        </div>

        {/* REGISTER */}
        <div className="relative flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">

          {/* MOBILE BACKGROUND */}
          <div className="absolute inset-0 lg:hidden">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
              alt=""
              className="w-full h-full object-cover object-[center_15%]"
            />

            <div className="absolute inset-0 bg-[#faf6f1]/90"></div>
          </div>

          {/* FORM CONTAINER */}
          <div className="relative z-10 w-full max-w-md">

            {/* HEADER */}
            <div className="text-center">
              <Link
                to="/"
                className="font-serif text-3xl sm:text-4xl tracking-[0.15em] text-[#9b3d5c]"
              >
                ThreadSutra
              </Link>

              <p className="mt-6 text-[11px] sm:text-xs tracking-[0.3em] text-[#9b3d5c] font-medium">
                CREATE YOUR ACCOUNT
              </p>

              <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-[#332525]">
                Register
              </h1>

              <p className="mt-4 text-sm sm:text-base text-gray-600">
                Join us and discover timeless Indian elegance.
              </p>
            </div>

            {/* FORM */}
            <form
              className="mt-8 sm:mt-9"
              onSubmit={handleSubmit}
            >

              {/* NAME */}
              <div>
                <label className="block text-xs tracking-[0.12em] uppercase text-[#332525] font-medium">
                  Full Name
                </label>

                <div className="relative mt-2">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#e7ddd5] text-sm text-[#332525] outline-none focus:border-[#9b3d5c] transition"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="mt-4">
                <label className="block text-xs tracking-[0.12em] uppercase text-[#332525] font-medium">
                  Email Address
                </label>

                <div className="relative mt-2">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#e7ddd5] text-sm text-[#332525] outline-none focus:border-[#9b3d5c] transition"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mt-4">
                <label className="block text-xs tracking-[0.12em] uppercase text-[#332525] font-medium">
                  Password
                </label>

                <div className="relative mt-2">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="w-full pl-11 pr-12 py-3.5 bg-white border border-[#e7ddd5] text-sm text-[#332525] outline-none focus:border-[#9b3d5c] transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#9b3d5c] transition"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mt-4">
                <label className="block text-xs tracking-[0.12em] uppercase text-[#332525] font-medium">
                  Confirm Password
                </label>

                <div className="relative mt-2">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    className="w-full pl-11 pr-12 py-3.5 bg-white border border-[#e7ddd5] text-sm text-[#332525] outline-none focus:border-[#9b3d5c] transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#9b3d5c] transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <p className="mt-4 text-sm text-red-600">
                  {error}
                </p>
              )}

              {/* TERMS */}
              <div className="flex items-start gap-2 mt-5">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-0.5 accent-[#9b3d5c]"
                />

                <label
                  htmlFor="terms"
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-[#9b3d5c] hover:text-[#7b2949]"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and Privacy Policy.
                </label>
              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                className="w-full mt-7 py-3.5 bg-[#9b3d5c] text-white text-sm tracking-[0.12em] font-medium hover:bg-[#7b2949] transition-all duration-300"
              >
                CREATE ACCOUNT
              </button>
            </form>

            {/* LOGIN */}
            <div className="flex items-center gap-4 my-7">
              <div className="flex-1 h-px bg-[#e7ddd5]"></div>

              <span className="text-xs text-gray-400">
                OR
              </span>

              <div className="flex-1 h-px bg-[#e7ddd5]"></div>
            </div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?

              <Link
                to="/login"
                className="ml-1 text-[#9b3d5c] font-medium hover:text-[#7b2949] transition"
              >
                Sign In
              </Link>
            </p>

            {/* HOME */}
            <div className="text-center mt-6">
              <Link
                to="/"
                className="text-xs tracking-widest text-gray-500 hover:text-[#9b3d5c] transition"
              >
                ← BACK TO HOME
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;