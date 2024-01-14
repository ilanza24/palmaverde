import { FcGoogle } from "react-icons/fc";

function OAuth() {
  return (
    <div className="flex justify-center items-center">
        <button className="rounded-full drop-shadow-2xl shadow-gray-500/50">
            <FcGoogle size={45} className="mt-2"/>
        </button>
    </div>
  )
}

export default OAuth