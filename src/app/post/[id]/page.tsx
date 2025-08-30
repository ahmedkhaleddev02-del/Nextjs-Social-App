"use client";
import Post from "@/app/_components/Post/Post";
import ProtectedRoute from "@/app/_components/ProtectedRoute/page";
import type { SinglePostPropsType } from "@/app/_interfaces/home";
import Loading from "@/app/loading";
import { getSinglePosts } from "@/lib/postslice";
import type { store } from "@/lib/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SinglePost({ params }: SinglePostPropsType) {
  // console.log(props.params.id);

  const { singlePost } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.posts
  );

  const dispatch = useDispatch<typeof store.dispatch>();

  useEffect(() => {
    dispatch(getSinglePosts(params.id));
  }, []);

  return (
    <>
    <ProtectedRoute>
      {singlePost ? (
        <div style={{ width: "60%",  marginLeft: "auto", marginRight: "auto" }}>
          <Post  allComments={true} post={singlePost} />
        </div>
      ) : (
        <Loading />
      )}
    </ProtectedRoute>

    </>
  );
}
