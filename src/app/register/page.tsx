"use client";
import { userRegister } from "@/lib/authslice";
import type { store } from "@/lib/store";
import { Button, Container, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import style from "./page.module.css";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch<typeof store.dispatch>();

  // start validation with yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "at least 3 characters")
      .max(10, "maximum 10 character")
      .required("name is required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "invalid Password"
      )
      .required(),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Not Match")
      .required("required"),
    dateOfBirth: Yup.string()
      .matches(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/, "Invalid Date")
      .required("Date of birth is required"),
    gender: Yup.string()
      .matches(/^(male)|(female)$/i)
      .required("Required Field"),
  });
  // end  validation with yup

  // start formik for form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      dispatch(userRegister(values))
        .then((res) => {
          // console.log("res", res);
          if (res.payload == "success") {
            toast.success("successfully registered");
            router.push("/login");
          } else {
            toast.error(res.payload);
          }
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
    validationSchema,
  });
  // end formik for form

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
          Register Now..
        </h1>
        <Paper
          sx={{
            padding: "15px",
          }}
          elevation={20}
        >
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <TextField
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="username"
              label="Username.."
              variant="outlined"
            ></TextField>
            {formik.errors.name && formik.touched.name ? (
              <div className={style.alert} role="alert">
                {formik.errors.name}
              </div>
            ) : null}

            <TextField
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              label="Email.."
              variant="outlined"
            ></TextField>
            {formik.errors.email && formik.touched.email ? (
              <div className={style.alert} role="alert">
                {formik.errors.email}
              </div>
            ) : null}

            <TextField
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              label="Password.."
              variant="outlined"
            ></TextField>
            {formik.errors.password && formik.touched.password ? (
              <div className={style.alert} role="alert">
                {formik.errors.password}
              </div>
            ) : null}

            <TextField
              name="rePassword"
              type="password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="repassword"
              label="Repassword.."
              variant="outlined"
            ></TextField>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className={style.alert} role="alert">
                {formik.errors.rePassword}
              </div>
            ) : null}

            <TextField
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="date"
              label="Birthday.."
              variant="outlined"
            ></TextField>
            {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
              <div className={style.alert} role="alert">
                {formik.errors.dateOfBirth}
              </div>
            ) : null}

            <TextField
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="gender"
              label="gender.."
              variant="outlined"
            ></TextField>
            {formik.errors.gender && formik.touched.gender ? (
              <div className={style.alert} role="alert">
                {formik.errors.gender}
              </div>
            ) : null}

            <Button
              type="submit"
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                borderRadius: "15px",
                ":hover": { backgroundColor: "#3a7ec3ff" },
              }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
