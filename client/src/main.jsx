import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css"; // css1 - css1 or css2 can be used
import "./assets/styles/bootstrap.custom.css"; // css2
import "./assets/styles/index.css"; // must always be kept on
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./store.js";
import App from "./App.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductsScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import PhotoScreen from "./screens/PhotoScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductsScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/photo" element={<PhotoScreen />} />
      <Route path="/auth" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
);
