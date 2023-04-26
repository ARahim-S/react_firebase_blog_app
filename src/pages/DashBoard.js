import { useBlog } from "../context/BlogContextProvider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import loadingGif from "../assets/loading.gif";
import BlogCard from "../components/BlogCard";

const DashBoard = () => {
  const { currentBlogs } = useBlog();
  return (
    <div className="dashboard-main">
      <Typography
        variant="h3"
        mt={2}
        align="center"
        sx={{ background: "#046592", color: "#eee" }}
      >
        Dashboard
      </Typography>
      <>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Grid container justifyContent={"center"} spacing={5}>
              {currentBlogs === undefined ? (
                <img src={loadingGif} alt="loading" />
              ) : currentBlogs ? (
                currentBlogs?.map((blog, id) => (
                  <Grid key={id} item>
                    <BlogCard post={blog} />
                  </Grid>
                ))
              ) : (
                <h3>No data available</h3>
              )}
            </Grid>
          </Grid>
        </Grid>
      </>
    </div>
  );
};

export default DashBoard;
