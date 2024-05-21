import { useState } from "react";
import { assets } from "../assets";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was send");
    } catch (error) {
      toast.error("Could not send reset password");
    }
  }

  return (
    <section className="bg-background w-full h-lvh text-font font-body flex flex-col justify-center">
      <h2 className="font-body text-3xl font-bold p-4">
        Forgot your Password?
      </h2>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div className="md:w-[70%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src={assets.forgot_pw}
            alt="forgot password"
            className="w-full"
          />
        </div>

        <div className="w-full md:w-[70%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              className="font-body text-sm w-full px-4 py-2 text-font-middle rounded-3xl bg-[#FEFDFC] transition ease-in-out mb-6 focus:border-[#FEFDFC]"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="email"
            />
            <button className="btn-peach" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
