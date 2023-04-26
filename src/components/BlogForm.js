import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";

const BlogForm = (props) => {
  const { blog, handler } = props;
  const [newBlog, setNewBlog] = useState(blog);

  const handleSubmit = (e) => {
    e.preventDefault();
    handler(newBlog);
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            required
            id="title"
            label="Title"
            name="title"
            value={newBlog.title}
            autoFocus
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="image"
            label="Image URL"
            name="image"
            type="text"
            value={newBlog.image}
            onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="outlined-multiline-static"
            label="Content"
            name="content"
            multiline
            type="text"
            rows={15}
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
          />
        </Grid>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          className="blog-submit"
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default BlogForm;
