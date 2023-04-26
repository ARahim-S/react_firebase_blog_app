import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import { Form, Formik } from "formik";
import * as yup from "yup";
import blogPng from "../assets/blogPng.png";
import googlePng from "../assets/googlePng.png";
import loadingGif from "../assets/loading.gif";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

const ValidationSchema = yup.object().shape({
  email: yup
    .string("Enter your email")
    .email("Invalid Email Address")
    .required("Required"),
  password: yup.string("Enter your password").required("Password required"),
});

const LoginAndRegisterForm = (props) => {
  const { handleChange, handleBlur, errors, isSubmitting, values, touched } =
    props;

  const { loginWithGoogle } = useAuth();

  const handleGoogleProvider = () => {
    loginWithGoogle();
  };

  return (
    <Grid container className="form-root">
      <Grid container justifyContent={"center"} className="form-image">
        <Grid
          className="form-paper-root"
          item
          component={Paper}
          elevation={6}
          square
          xs={12}
          sm={8}
          md={6}
        >
          <Grid className="form-paper">
            <Avatar sx={{ width: 150, height: 150 }} className="form-avatar">
              <img src={blogPng} style={{ width: 200 }} alt="candela" />
            </Avatar>
            <Typography className="form-header" component={"h1"} variant={"h5"}>
              {props.method}
            </Typography>
            <Form className="form-form">
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              {isSubmitting ? (
                <div className="form-loading-container">
                  <img
                    src={loadingGif}
                    alt="loading"
                    className="form-loadingGif"
                  />
                </div>
              ) : (
                <div className="form-btn-container">
                  <Button
                    type="submit"
                    style={{
                      width: "75%",
                    }}
                    variant="contained"
                    className="form-submit-btn"
                  >
                    {props.method}
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    className="form-google-btn"
                    onClick={handleGoogleProvider}
                    sx={{ background: "orangered" }}
                    style={{
                      width: "75%",
                    }}
                  >
                    With
                    <img
                      src={googlePng}
                      alt="google"
                      className="form-googleImg"
                    />
                  </Button>
                </div>
              )}
            </Form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Authorization = (props) => {
  const [method] = useState(props.method);
  const navigate = useNavigate();
  const { signUp, login, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
    console.log(currentUser);
  }, [currentUser, navigate]);

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={ValidationSchema}
        onSubmit={(values, actions) => {
          if (method === "Login") {
            login(values.email, values.password)
              .then(() => {
                toast.success(`${method} successfully performed!`);
                navigate("/profile");
                actions.setSubmitting(false);
              })
              .catch((error) => {
                toast.error(error.message);
                actions.setSubmitting(false);
                actions.resetForm();
              });
          } else {
            signUp(values.email, values.password)
              .then(() => {
                toast.success(`${method} successfully performed!`);
                navigate("/");
                actions.setSubmitting(false);
              })
              .catch((error) => {
                toast.error(error.message);
                actions.setSubmitting(false);
                actions.resetForm();
              });
          }
        }}
        component={(props) => (
          <LoginAndRegisterForm method={method} {...props} />
        )}
      ></Formik>
    </div>
  );
};

export default Authorization;
