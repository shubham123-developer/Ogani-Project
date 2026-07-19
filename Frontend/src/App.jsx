import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Nav from "./components/Nav"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import ProductDetails from "./pages/Product"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Shop from "./pages/Shop"
export default function App() {
    const routes = createBrowserRouter([
        {
            path: "/", element: <Layout />, children: [
                { path: "/", element: <Home /> },
                { path: "/nav", element: <Nav /> },
                { path: "/profile", element: <Profile /> },
                { path: "/product", element: <ProductDetails /> },
                { path: "/contact", element: <Contact /> },
                { path: "/cart", element: <Cart /> },
                {path: "/shop", element: <Shop />}
            ]
        },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
    ])
    return (
        <RouterProvider router={routes} />
    )
}