import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import { useBlog } from "../context/BlogContextProvider";

import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import blogPng from "../assets/blogPng.png";
import Typography from "@mui/material/Typography";
import BlogForm from "../components/BlogForm";
import { toast } from "react-toastify";

const NewBlog = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addBlog } = useBlog();

  const blog = {
    author: currentUser.email,
    title: " ",
    content: " ",
    get_comment_count: 0,
    get_like_count: 0,
    image: " ",
    published_date: Date.now(),
  };

  const handler = (newBlog) => {
    try {
      addBlog(newBlog);
      navigate("/");
      toast.success("Blog added");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Container maxWidth={"xs"}>
      <CssBaseline />
      <div className="new-blog-paper">
        <Avatar className="new-blog-avatar">
          <img src={blogPng} alt="blog" />
        </Avatar>
        <Typography component="h1" variant="h5" className="new-blog-title">
          New Blog
        </Typography>
      </div>
      <BlogForm blog={blog} handler={handler} />
    </Container>
  );
};

export default NewBlog;
