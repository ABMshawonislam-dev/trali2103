import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Menubar from "./components/Menubar";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Vendor from "./pages/Vendor";
import Dashboard from "./pages/Dashboard";
import ProductUpload from "./pages/ProductUpload";
import Storename from "./pages/Storename";
import AdminDashboard from "./pages/AdminDashboard";
import ProductPosition from "./pages/ProductPosition";
import Cart from "./pages/Cart";
import Cupon from "./pages/Cupon";
import ProductDetails from "./pages/ProductDetails";
function App() {
  return (
    <>
    <BrowserRouter>
      <Menubar></Menubar>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/vendor" element={<Vendor />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/productupload" element={<ProductUpload />}></Route>
      <Route path="/storename" element={<Storename />}></Route>
      <Route path="/admin" element={<AdminDashboard />}></Route>
      <Route path="/proposition" element={<ProductPosition />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/cupon" element={<Cupon />}></Route>
      <Route path="/productdetails/:id" element={<ProductDetails />}></Route>
    </Routes>
  </BrowserRouter>
      
    </>
  );
}

export default App;
