import { Link } from "react-router-dom";
import { assets } from "../assets";

function Home() {
  return (
    <section className="bg-background-green w-full h-screen p-4 flex justify-center flex-col text-[#fff]">
      <div className="mx-auto p-6 max-w-[30rem]">
        <h1 className="font-body text-4xl leading-relaxed my-8">
          Welcome to <br />
          <span className="font-title text-7xl">Palma Verde</span>
        </h1>
        <div className="flex justify-center items-center">
          <div className="mb-6">
            <img
              src={assets.home_market}
              alt="home"
              className="w-full h-auto"
            />
            <p className="text-center font-body text-lg leading-8 py-8">
              Shop for organic produce <br />
              straight from the farm!
            </p>
            <Link to="/farmer-sign-up">
              <button className="button-orange">Farmer</button>
            </Link>
            <Link to="/customer-sign-up">
              <button className="button-transparent">Customer</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
