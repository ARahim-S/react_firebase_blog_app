import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

const PrivateRouter = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
