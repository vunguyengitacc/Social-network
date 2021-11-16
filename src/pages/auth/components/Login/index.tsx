import Box from "@mui/material/Box";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React from "react";
import { Button } from "@mui/material";
import InputPassworldField from "components/InputField/InputPasswordField";
import InputTextField from "components/InputField/InputTextField";
import useLoginStyles from "./style";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "app/store";
import { login } from "reduxSlice/authSlice";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import schema from "./form";

export interface ILoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = (props) => {
  const style = useLoginStyles();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const form = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const submitLogin = async (data: ILoginFormValues) => {
    const toastId = toast.loading("Loading");
    try {
      await dispatch(login(data)).then(unwrapResult);
      toast.success("Login successully", { id: toastId });
      history.push("/home");
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const loginWithFacebook = async () => {
    window.open("http://localhost:5000/api/auth/facebook", "_self");
  };
  return (
    <Box className={style.form}>
      <form onSubmit={form.handleSubmit(submitLogin)}>
        <InputTextField
          name="username"
          placeholder="Please enter your username"
          form={form}
        />
        <InputPassworldField
          name="password"
          form={form}
          placeholder="Please enter your password"
        />

        <Button
          type="submit"
          className={style.submitButton}
          fullWidth
          color="success"
        >
          Login
        </Button>
        <Button
          className={style.facebookAuth}
          fullWidth
          color="success"
          onClick={loginWithFacebook}
        >
          Login with facebook
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
