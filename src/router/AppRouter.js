import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Login, Register } from "../pages/LoginRegister";
import DashBoard from "../pages/DashBoard";
import UpdateBlog from "../pages/UpdateBlog";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Detail from "../pages/Detail";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" exact element={<DashBoard />} />

        <Route element={<PrivateRouter />}>
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/new-blog" exact element={<NewBlog />} />
          <Route path="/update-blog/:id" exact element={<UpdateBlog />} />
          <Route path="/detail/:id" exact element={<Detail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
