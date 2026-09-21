import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/dashboard";
import GroupDetail from "../components/groupDetail/groupDetail";

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/group/:id", element: <GroupDetail /> },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;