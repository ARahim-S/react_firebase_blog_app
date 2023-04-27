import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContextProvider";

const UpdateBlog = ({ match }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOneBlog, updateBlog } = useBlog();
  const result = getOneBlog(id);
  console.log(result);

  const res = result ? result[0] : { title: "", content: "", image: "" };
  return <div>UpdateBlog</div>;
};

export default UpdateBlog;
