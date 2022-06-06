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
    </Routes>
  </BrowserRouter>
      
    </>
  );
}

export default App;
