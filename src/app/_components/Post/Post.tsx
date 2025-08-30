"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import type { CommentType, PostType } from "@/app/_interfaces/home";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, TextField } from "@mui/material";
import myImage from "../../../assets/images/blog-img-2.jpeg";

// start Post function
export default function Post({
  post,
  allComments = false,
}: {
  post: PostType;
  allComments?: boolean;
}) {
  const router = useRouter();

  function handleNavigation(id: string) {
    router.push(`/user/${id}`);
  }

  function postDetails(id: string) {
    router.push(`/post/${id}`);
  }

  function handleImg(imgSrc: string) {
    const allKewordsOfSrc = imgSrc.split("/");
    const lastKeyword = allKewordsOfSrc[allKewordsOfSrc.length - 1];
    if (lastKeyword == "undefined") {
      return myImage;
    } else {
      return imgSrc;
    }
  }

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], cursor: "pointer" }}
            aria-label="recipe"
            onClick={() => {
              handleNavigation(post.user._id);
            }}
          >
            <Image src={post.user.photo} alt="" width={50} height={50} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader={post.createdAt}
        titleTypographyProps={{
          sx: { cursor: "pointer" },
          onClick: () => {
            handleNavigation(post.user._id);
          },
        }}
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post.body}
        </Typography>
      </CardContent>

      {post.image ? (
        <CardMedia
          component="img"
          height="194"
          image={post.image}
          alt="Paella dish"
        />
      ) : (
        ""
      )}

      <CardActions>
        <IconButton aria-label="add to favorites">
          <ThumbUpIcon />
        </IconButton>

        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <TextField
        sx={{ marginBlock: "10px" }}
        fullWidth
        placeholder="Add Your Comment"
      ></TextField>

      {/* showing comments  */}
      {post.comments.length > 0 && allComments == false ? (
        <Box sx={{ backgroundColor: "gray" }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500], cursor: "pointer" }}
                aria-label="recipe"
                onClick={() => {
                  handleNavigation(post.comments[0].commentCreator._id);
                }}
              >
                <Image
                  src={handleImg(post.comments[0].commentCreator.photo)}
                  alt=""
                  width={50}
                  height={50}
                />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={post.comments[0].commentCreator.name}
            subheader={post.comments[0].createdAt}
            titleTypographyProps={{
              sx: { cursor: "pointer" },
              onClick: () => {
                handleNavigation(post.comments[0].commentCreator._id);
              },
            }}
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {post.comments[0].content}
            </Typography>
          </CardContent>
        </Box>
      ) : (
        post.comments.map((commentaya: CommentType) => (
          <Box key={commentaya._id} sx={{ backgroundColor: "gray" }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500], cursor: "pointer" }}
                  aria-label="recipe"
                  onClick={() => {
                    handleNavigation(commentaya.commentCreator._id);
                  }}
                >
                  <Image
                    src={handleImg(commentaya.commentCreator.photo)}
                    alt=""
                    width={50}
                    height={50}
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={commentaya.commentCreator.name}
              subheader={commentaya.createdAt}
              titleTypographyProps={{
                sx: { cursor: "pointer" },
                onClick: () => {
                  handleNavigation(commentaya.commentCreator._id);
                },
              }}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {commentaya.content}
              </Typography>
            </CardContent>
          </Box>
        ))
      )}

      {/* /******************************************* */}

      {post.comments.length > 1 && allComments == false ? (
        <Typography
          onClick={() => {
            postDetails(post._id);
          }}
          sx={{ cursor: "pointer", marginBlock: "10px", padding: "10px" }}
          component="p"
          variant="h6"
        >
          View more comments..
        </Typography>
      ) : (
        ""
      )}
    </Card>
  );
}
