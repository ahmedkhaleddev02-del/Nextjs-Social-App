"use client";
import { Button, Container, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../lib/store";
import { userLogin } from "@/lib/authslice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const x = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth
  );

  const router = useRouter();
  const dispatch = useDispatch<typeof store.dispatch>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(userLogin(values))
        .then((res) => {
          // console.log("res", res);
          if (res.payload.message == "success") {
            toast.success("Welcome Back 👋");
            localStorage.setItem("userToken", res.payload.token)
            router.push("/");
          } else {
            toast.error(res.payload);
          }
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
  });
  return (
    <>

      <Container sx={{ marginBlock: "30px" }} maxWidth={"sm"}>
        <h1
          style={{
            fontWeight: "bolder",
            textAlign: "center",
            marginBlock: "15px",
            color: "#1976d2",
          }}
        >
          Login Now..
        </h1>

        <Paper
          sx={{
            padding: "15px",
          }}
          elevation={20}
        >
          <form
            onSubmit={formik.handleSubmit}
            style={{ flexDirection: "column", gap: "15px", display: "flex" }}
          >
            <TextField
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
              label="Email.."
              variant="outlined"
            ></TextField>

            <TextField
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
              id="password"
              label="Password.."
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
              Login
            </Button>
          </form>
        </Paper>
      </Container>


    </>
  );
}
