import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import { useParams } from "react-router-dom";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import moment from "moment";
import { AccountCircle, ChatBubbleOutline } from "@mui/icons-material";
import { useBlog } from "../context/BlogContextProvider";

const Detail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { getOneBlog, deleteOneBlog } = useBlog();
  const result = getOneBlog(id);

  const res = result ? result[0] : { title: "", content: "", image: "" };

  const deleteHandler = (id) => {
    deleteOneBlog(id);
    navigate("/");
    toast.success("Blog Deleted successfully!");
  };

  const updateHandler = (id) => {
    navigate(`/update-blog/${id}`);
  };

  return (
    <div className="detail-root">
      <Typography variant="h3" className="detail-header" noWrap>
        Details
      </Typography>
      <Card className="detail-card-root">
        <div>
          <CardMedia
            className="detail-media"
            image={res.image}
            title={res.title}
          />
          <CardContent className="detail-card-content">
            <Typography
              gutterBottom
              variant="h5"
              component={"h2"}
              className="detail-title"
            >
              {" "}
              {res.title}{" "}
            </Typography>
            <Typography
              variant="body2"
              color={"text.secondary"}
              component={"p"}
              className="detail-data-style"
            >
              {moment(res.published_data).format("MMM DD, YYY")}
            </Typography>
            <p>{res.content}</p>
          </CardContent>
        </div>
        <CardActions>
          <AccountCircle className="detail-avatar" />
          <Typography gutterBottom variant="h6" component="h2">
            {" "}
            {res.author}{" "}
          </Typography>
        </CardActions>
        <CardActions>
          <IconButton aria-label="add to favorites" className="icon-image">
            <FavoriteIcon
              color={res.get_like_count > 0 ? "secondary" : "disabled"}
            />
          </IconButton>
          <Typography variant="body2" color={"text.secondary"}>
            {res.get_like_count}
          </Typography>
          <IconButton aria-label="comment count" className="icon-image">
            <ChatBubbleOutline />
          </IconButton>
          <Typography variant="body2" color={"text.secondary"}>
            {res.get_comment_count}
          </Typography>
        </CardActions>
      </Card>
      {res.author === currentUser?.email && (
        <div className="buttonGroup">
          <Button variant="contained" onClick={() => updateHandler(res.id)}>
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteHandler(res.id)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Detail;
