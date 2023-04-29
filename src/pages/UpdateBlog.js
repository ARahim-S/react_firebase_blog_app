import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContextProvider";
import BlogForm from "../components/BlogForm";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

const UpdateBlog = ({ match }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOneBlog, updateBlog } = useBlog();
  const result = getOneBlog(id);

  const res = useMemo(() => {
    return result ? result[0] : { title: "", content: "", image: "" };
  }, [result]);

  const [updatedBlog, setUpdatedBlog] = useState(res);

  useEffect(() => {
    setUpdatedBlog(res);
  }, [res]);

  const handler = (blogToUpDate) => {
    try {
      updateBlog(res?.id, blogToUpDate);
      navigate("/");
      toast.success("Blog updated");
    } catch (error) {
      toast.error(error.message || "Blog can not be updated");
    }
  };

  return (
    <Container maxWidth={"xs"} className={"updateBlog-root"}>
      <div className="newBlog-paper">
        <img src={updatedBlog?.image} alt="blog" className="newBlog-image" />
        <Typography component="h1" variant="h5" className="newBlog-title">
          Update Blog
        </Typography>
        <BlogForm blog={updatedBlog} handler={handler} />
      </div>
    </Container>
  );
};

export default UpdateBlog;
