"use client";
import { Button, Container, Paper, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import type { AddPostType } from "../_interfaces/home";
import ProtectedRoute from "../_components/ProtectedRoute/page";

export default function Profile() {
  async function addPost(formData:AddPostType) {
    const { data } = await axios.post(
      `https://linked-posts.routemisr.com/posts`,
      formData,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    console.log(data);
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    // console.log(e.target?.body.value);
    // console.log(e.target?.image.files[0]);
    const formData = new FormData();
    const body = e.target?.body.value;
    const image = e.target?.image.files[0];
    formData.append("body", body);
    formData.append("image", image);
    addPost(formData);
  }

  return (
    <>
    <ProtectedRoute>
      <Container sx={{ marginBlock: "50px" }} maxWidth={"lg"}>
        <h1
          style={{
            fontWeight: "bolder",
            textAlign: "center",
            marginBlock: "15px",
            color: "#1976d2",
          }}
        >
          What's in your mind
        </h1>

        <Paper
          sx={{
            padding: "60px",
          }}
          elevation={20}
        >
          <form
            onSubmit={handleSubmit}
            style={{ flexDirection: "column", gap: "15px", display: "flex" }}
          >
            <TextField
              type="text"
              name="body"
              id="body"
              label="Body.."
              variant="outlined"
            ></TextField>

            <TextField
              name="image"
              type="file"
              id="image"
              variant="outlined"
            ></TextField>

            <Button
              type="submit"
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                borderRadius: "15px",
                ":hover": { backgroundColor: "#3a7ec3ff" },
              }}
            >
              Add Post
            </Button>
          </form>
        </Paper>
      </Container>
    </ProtectedRoute>

    </>
  );
}
