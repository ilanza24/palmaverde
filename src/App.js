import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CustomerSignIn from "./pages/Customer/CustomerSignIn";
import CustomerSignUp from "./pages/Customer/CustomerSignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerListOFProduct from "./pages/Customer/CustomerListOFProduct.jsx";
import FarmerInventoryManager from "./pages/Farmer/FarmerInventoryManager";
import FarmerSignUp from "./pages/Farmer/FarmerSignUp";
import FarmerSignIn from "./pages/Farmer/FarmerSignIn";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer-sign-in" element={<CustomerSignIn />} />
          <Route path="/customer-sign-up" element={<CustomerSignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/customer-list-product"
            element={<CustomerListOFProduct />}
          />
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
