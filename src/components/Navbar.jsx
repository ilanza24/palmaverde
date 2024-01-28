import { FaRegUser } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { LuHome, LuInfo } from "react-icons/lu";

function Navbar() {
  return (
    <nav className="bg-[#fff] h-44 flex justify-center items-center">
        <div className="flex items-center gap-88 text-font text-3xl">
            <LuHome/>
            <FaRegUser/>
            <FaRegMessage/>
            <LuInfo/>
        </div>
    </nav>
  )
}

export default Navbar