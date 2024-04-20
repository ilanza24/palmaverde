import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadProduct from "./pages/UploadProduct";
import FarmerInventoryManager from "./pages/Farmer/FarmerInventoryManager";
import FarmerSignUp from "./pages/Farmer/FarmerSignUp";
import FarmerSignIn from "./pages/Farmer/FarmerSignIn";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/upload-product" element={<UploadProduct />} />
          <Route
            path="/farmer-manage-inventory/:userId"
            element={<FarmerInventoryManager />}
          />
          <Route path="/farmer-sign-up" element={<FarmerSignUp />} />
          <Route path="/farmer-sign-in" element={<FarmerSignIn />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
