import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Erro } from "./pages/Erro";
import { Logout } from "./pages/Logout";
import Users from "./pages/Admin/Users";
import CreateProduct from "./pages/Admin/CreateProduct";
import Createcategory from "./pages/Admin/Createcategory";
import Product from "./pages/Admin/Product";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UpdateProduct from "./pages/Admin/UpdateProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Erro />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<Users />} />
          <Route path="create-category" element={<Createcategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="product/:slug" element={<UpdateProduct />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
