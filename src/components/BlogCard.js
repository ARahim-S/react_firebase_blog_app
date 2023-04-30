import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { AccountCircle, ChatBubbleOutline } from "@mui/icons-material";
import { useState } from "react";
import { useBlog } from "../context/BlogContextProvider";

export default function BlogCard({ post }) {
  const [newBlog, setNewBlog] = useState(post);
  const { updateBlog } = useBlog();
  const {
    id,
    author,
    content,
    get_comment_count,
    get_like_count,
    image,
    published_date,
    title,
  } = post;
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const placeholder = "https://picsum.photos/400/400";

  const openDetails = () => {
    if (!currentUser) {
      toast.error("Please log in to getting blog details");
    }

    navigate(`/detail/${id}`);
  };

  const handleLikeClick = (id) => {
    if (!currentUser) {
      toast.error("Please log in to click the like button");
    } else {
      setNewBlog((newBlog) => ({
        ...newBlog,
        get_like_count: (newBlog.get_like_count += 1),
      }));

      updateBlog(newBlog?.id, newBlog);
    }
  };

  return (
    <Card sx={{ maxWidth: 500 }} className="blog-root">
      <CardActionArea onClick={openDetails}>
        <CardMedia
          component="img"
          height="194"
          image={image || placeholder}
          alt="blog"
          className="card-media"
          title={title}
        />
        <CardContent className="card-content">
          <Typography
            variant="h5"
            component={"h2"}
            className="blog-title"
            color="text.secondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            component={"p"}
            color="text.secondary"
            gutterBottom
          >
            {moment(published_date).format("MMM DD, YYYY")}
          </Typography>
          <p className="card-content-detail">{content}</p>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AccountCircle className="card-avatar" />
        <Typography gutterBottom variant="h6" component={"h2"}>
          {author}
        </Typography>
      </CardActions>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          className="icon-image"
          onClick={handleLikeClick}
        >
          <FavoriteIcon color={get_like_count > 0 ? "secondary" : "disabled"} />
        </IconButton>
        <Typography variant="body2" color={"text.secondary"}>
          {get_like_count}
        </Typography>
        <IconButton aria-label="comment count" className="icon-image">
          <ChatBubbleOutline />
        </IconButton>
        <Typography variant="body2" color={"text.secondary"}>
          {get_comment_count}
        </Typography>
      </CardActions>
    </Card>
  );
}
