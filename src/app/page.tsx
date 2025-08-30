"use client";
import Grid from "@mui/material/Grid";
import Post from "./_components/Post/Post";
import { getAllPosts } from "@/lib/postslice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { store } from "@/lib/store";
import type { PostType } from "./_interfaces/home";
import Loading from "./loading";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter() 

  const { allPosts } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.posts
  );

  const dispatch = useDispatch<typeof store.dispatch>();
  const userToken = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth.userToken
  );

  useEffect(() => {
    if (!userToken) {
      // ✅ لو مفيش توكن يروح ع اللوجين
      router.push("/login");
      return;
    }
    dispatch(getAllPosts());
  }, [userToken, dispatch, router]);

  // console.log(allPosts);

  return (
    <>
      {allPosts?.length > 0 ? (
        <Grid container spacing={3} sx={{ marginBlock: "30px" }}>
          <Grid size={{ sm: 3 }}></Grid>
          <Grid size={{ sm: 6 }} sx={{ paddingBlock: "10px" }}>
            {allPosts?.map((postaya: PostType) => (
              <Post post={postaya} key={postaya._id} />
            ))}
          </Grid>
          <Grid size={{ sm: 3 }}></Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  );
}
