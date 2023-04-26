import React, { createContext, useContext, useState, useEffect } from "react";
import { firebaseDB } from "../utils/firebaseUtil";
import { ref, onValue, push, set } from "firebase/database";
import { toast } from "react-toastify";

//! Create context for authentication data
const BlogContext = createContext();

//Definig a method for getting context
//it returns state and dispatch
export const useBlog = () => {
  return useContext(BlogContext);
};

//Defining a method for BlogContext.Provider
const BlogContextProvider = ({ children }) => {
  const [currentBlogs, setCurrentBlogs] = useState();

  const addBlog = async (blogvalue) => {
    try {
      const blogRef = ref(firebaseDB, "blog");
      const newBlog = push(blogRef);
      set(newBlog, {
        author: blogvalue.author,
        title: blogvalue.title,
        content: blogvalue.content,
        get_comment_count: blogvalue.get_comment_count,
        get_like_count: blogvalue.get_like_count,
        image: blogvalue.image,
        published_date: blogvalue.published_date,
      });
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  const getOneBlog = async (id) => {
    try {
      const result = currentBlogs?.filter((item) => item.id === id);
      return result;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteOneBlog = async (id) => {
    try {
      const blogIdRef = ref(firebaseDB, "blog" + id);
      blogIdRef.remove();
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateBlog = async (id, data) => {
    try {
      const contactRef = ref(firebaseDB, "blog" + id);
      contactRef.update(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const blogRef = ref(firebaseDB, "blog");
    onValue(blogRef, (snapshot) => {
      const blogs = snapshot.val();
      const blogL = [];
      for (let id in blogs) {
        blogL.push({ id, ...blogs[id] });
      }
      setCurrentBlogs(blogL);
    });
  }, []);

  const values = {
    currentBlogs,
    addBlog,
    getOneBlog,
    deleteOneBlog,
    updateBlog,
  };
  return <BlogContext.Provider value={values}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
