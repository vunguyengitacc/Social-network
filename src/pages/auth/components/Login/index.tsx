import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React from "react";
import { Button } from "@mui/material";
import InputPassworldField from "../../../../components/InputField/InputPasswordField/InputPasswordField";
import InputTextField from "../../../../components/InputField/InputTextField/InputTextField";

const useStyle = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "80%",
    marginLeft: "10%",
  },
  label: {
    textAlign: "left",
  },
  submitButton: {
    height: "50px",
    marginTop: "40px !important",
    marginBottom: "30px !important",
    backgroundImage: "linear-gradient(#89f7fe, #66a6ff)",
  },
  facebookAuth: {
    height: "50px",
    marginBottom: "30px !important",
    backgroundImage: "linear-gradient(#89f7fe, #66a6ff)",
  },
});

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("Please enter username.")
      .min(6, "Please enter at least 6 characters.")
      .max(35, "Please enter at most 35 characters"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Please enter at least 6 characters.")
      .max(30, "Please enter at most 30 characters"),
  })
  .required();

export interface ILoginFormValues {
  username: string;
  password: string;
}

interface ILoginProp {
  onSubmit: (data: ILoginFormValues) => void;
}

const LoginForm: React.FC<ILoginProp> = ({ onSubmit }) => {
  const style = useStyle();

  const form = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const loginWithFacebook = async () => {
    window.open("http://localhost:5000/api/auth/facebook", "_self");
  };
  return (
    <Box className={style.form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
