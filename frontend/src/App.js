import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./containers/Home";
import Dashboard from "./components/Dashboard";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";
import EditCategory from "./components/EditCategory";
import EditProduct from "./components/EditProduct";
import Cart from "./containers/Cart";
import Checkout from "./containers/Checkout";
import Orders from "./containers/Order";
import Search from "./containers/Search";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/product" Component={ProductForm} />
        <Route path="/category" Component={CategoryForm} />
        <Route path="/category/:categoryId" Component={EditCategory} />
        <Route path="/product/:productId" Component={EditProduct} />
        <Route path="/cart" Component={Cart} />
        <Route path="/checkout" Component={Checkout} />
        <Route path="/orders" Component={Orders} />
        <Route path="/search" Component={Search} />

      </Routes>
      
    </div></Router>
  );
}

export default App;
