import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login-user",
        { email, password },
        { withCredentials: true }
      );

      console.log(response.data);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "Invalid email or password"
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
                WELCOME TO ThreadSutra
              </p>

              <h2 className="mt-4 font-serif text-4xl xl:text-5xl leading-tight">
                Elegance begins
                <br />
                with every thread.
              </h2>

              <p className="mt-5 text-sm text-white/80 leading-relaxed">
                Discover timeless sarees crafted with tradition, elegance and
                attention to every detail.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT / LOGIN */}
        <div className="relative flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">

          {/* Mobile Background */}
          <div className="absolute inset-0 lg:hidden">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
              alt=""
              className="w-full h-full object-cover object-[center_15%]"
            />

            <div className="absolute inset-0 bg-[#faf6f1]/90"></div>
          </div>

          {/* Login Box */}
          <div className="relative z-10 w-full max-w-md">

            {/* Heading */}
            <div className="text-center">
              <Link
                to="/"
                className="font-serif text-3xl sm:text-4xl tracking-[0.15em] text-[#9b3d5c]"
              >
                ThreadSutra
              </Link>

              <p className="mt-7 text-[11px] sm:text-xs tracking-[0.3em] text-[#9b3d5c] font-medium">
                WELCOME BACK
              </p>

              <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-[#332525]">
                Log In
              </h1>

              <p className="mt-4 text-sm sm:text-base text-gray-600">
                Log in to continue your shopping journey.
              </p>
            </div>

            {/* FORM */}
            <form
              className="mt-8 sm:mt-10"
              onSubmit={submitHandler}
            >

              {/* EMAIL */}
              <div>
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
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#e7ddd5] text-sm text-[#332525] outline-none focus:border-[#9b3d5c] transition"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs tracking-[0.12em] uppercase text-[#332525] font-medium">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs text-[#9b3d5c] hover:text-[#7b2949] transition"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative mt-2">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="w-full pl-11 pr-12 py-3.5 bg-white border border-[#e7ddd5] text-sm text-[#332525] outline-none focus:border-[#9b3d5c] transition"
                  />

                  {/* PASSWORD SHOWING BUTTON */}
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

              {/* ERROR MESSAGE */}
              {error && (
                <p className="mt-4 text-sm text-red-600">
                  {error}
                </p>
              )}

              {/* REMEMBER */}
              <div className="flex items-center gap-2 mt-5">
                <input
                  type="checkbox"
                  id="remember"
                  className="accent-[#9b3d5c]"
                />

                <label
                  htmlFor="remember"
                  className="text-xs sm:text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full mt-7 py-3.5 bg-[#9b3d5c] text-white text-sm tracking-[0.12em] font-medium hover:bg-[#7b2949] transition-all duration-300"
              >
                LOG IN
              </button>
            </form>

            {/* REGISTER */}
            <div className="flex items-center gap-4 my-7">
              <div className="flex-1 h-px bg-[#e7ddd5]"></div>

              <span className="text-xs text-gray-400">
                OR
              </span>

              <div className="flex-1 h-px bg-[#e7ddd5]"></div>
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?

              <Link
                to="/register"
                className="ml-1 text-[#9b3d5c] font-medium hover:text-[#7b2949] transition"
              >
                Create Account
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

export default Login;