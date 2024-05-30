import { useState } from "react";
import { assets } from "../../assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
//import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import SignInUp from "../../components/Customer/SignInUp";

function CustomerSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/customer-list-product");
      }
    } catch (error) {
      console.log("sign", error);
      toast.error("Bad user credentials");
    }
  }

  return (
    <section className="bg-primary">
      <div className="flex justify-around items-center py-4 mb-8 max-w-[30rem] mx-auto">
        <h2 className="font-body text-5xl font-semibold p-4 text-font-light">
          Sign <br />
        </h2>
        <img
          className="w-[10rem] drop-shadow-md"
          src={assets.fruit_basket}
          alt="palma verde fruit basket"
        />
      </div>

      <div className="bg-font-light rounded-t-[1.85rem] px-6 py-12">
        <SignInUp />
        <div className="max-w-[30rem] mx-auto">
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-font-middle px-2 py-2 font-light"
              >
                Email
              </label>
              <input
                className="font-body text-sm w-full my-2 px-4 py-2 text-font-middle
                rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
                type="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="email"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="text-font-middle px-2 py-2 font-light"
              >
                Password
              </label>
              <div className="relative mb-6">
                <input
                  className="font-body text-sm w-full my-2 px-4 py-2 text-font-middle 
                rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={onChange}
                  placeholder="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="absolute right-4 top-4 text-xl cursor-pointer text-font-middle"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-4 top-4 text-xl cursor-pointer text-font-middle"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                )}
              </div>
            </div>

            <button type="submit" className="button-green mb-2">
              Sign In
            </button>
            <div>
              <p className="text-center text-sm text-font-middle py-2">
                <Link
                  className="cursor-pointer underline"
                  to="/forgot-password"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
            <div
              className="my-4 max-w-xs m-auto flex items-center 
                  before:border-t 
                  before:flex-1 
                  before:text-font-middle
                  after:border-t
                  after:flex-1
                  after:text-font-middle"
            >
              <p className="text-sm text-center mx-4 text-font-middle">
                or sign in with
              </p>
            </div>
            <div className="flex gap-12 justify-center py-4">
              {/* Deleting this line as I don't see oAuth Component
               <OAuth/>
              <OAuth/>
              <OAuth/> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CustomerSignIn;
