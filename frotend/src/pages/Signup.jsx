import { useState } from "react";
import { LuBotMessageSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";
const Signup = () => {
  const { signup, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    country: "India",
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid Email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      toast.error(
        "Password must contain at least 1 uppercase letter, 1 digit, and 1 special character"
      );
      return false;
    }
    if (!formData.country || formData.country === "Pick a Country") {
      toast.error("Please select a country");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    signup(formData);
  };

  const handleCountryChange = (e) => {
    setFormData({ ...formData, country: e.target.value });
  };

  return (
    <div className="hero bg-base-100 h-[calc(100vh-4rem)] w-full">
      <div className="hero-content rounded-2xl backdrop:blur-2xl shadow-2xl bg-base-100 border-1 border-primary/70 flex-col w-xs md:w-sm">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
          <div className="flex flex-col items-center justify-center pt-4">
            <h1 className="font-semibold text-center text-primary/80 text-2xl">
              Create Account
            </h1>
            <h3 className="text-center text-base-content/60 text-xs mt-1">
              Get started with free account
            </h3>
          </div>

          <form className="card-body" onSubmit={handleSubmit}>
            <fieldset className="fieldset flex flex-col gap-1">
              <div className="flex flex-col gap-5">
                <label className="floating-label">
                  <span>Full Name</span>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input input-md focus:outline-1 focus:outline-primary focus:border-transparent rounded-lg"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </label>

                <label className="floating-label">
                  <span>Your Email</span>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    required
                    className="input input-md focus:outline-1 focus:outline-primary focus:border-transparent rounded-lg"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </label>

                <fieldset className="fieldset">
                  <label className="floating-label">
                    <span>Country</span>
                    <select
                      value={formData.country}
                      onChange={handleCountryChange}
                      className="select w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-[50px] overflow-y-auto"
                    >
                      <option value="Pick a Country" disabled>
                        Pick a Country
                      </option>
                      <option value="USA">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="India">India</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Japan">Japan</option>
                      <option value="South Korea">South Korea</option>
                      <option value="China">China</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Russia">Russia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Greece">Greece</option>
                      <option value="Norway">Norway</option>
                      <option value="Finland">Finland</option>
                      <option value="Denmark">Denmark</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Israel">Israel</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Chile">Chile</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Thailand">Thailand</option>
                    </select>
                  </label>
                </fieldset>

                <label className="floating-label relative">
                  <span>Password</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-md focus:outline-1 focus:outline-primary focus:border-transparent rounded-lg"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute p-1 cursor-pointer right-2 top-[10px] text-base-content/70"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </label>
              </div>

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="btn btn-primary text-primary-content mt-4 rounded-lg"
              >
                Sign Up
              </button>
            </fieldset>

            <h1>
              Already have an Account
              <Link className="text-primary font-medium" to="/login">
                {" "}
                Login
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
