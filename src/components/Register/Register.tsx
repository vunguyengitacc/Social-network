import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import InputTextField from "../InputField/InputTextField/InputTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputPassworldField from "../InputField/InputPasswordField/InputPasswordField";
import React from "react";
import { Button } from "@mui/material";

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
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Confirm password must match password"),
    fullname: yup
      .string()
      .required("Please enter your full name")
      .min(6, "Please enter at least 6 characters.")
      .max(35, "Please enter at most 35 characters"),
  })
  .required();

export interface IRegisterFormValues {
  username: string;
  password: string;
  fullname: string;
  passwordConfirm: string;
}

interface IRegisterProp {
  onSubmit: (data: IRegisterFormValues) => void;
}

const RegisterForm: React.FC<IRegisterProp> = ({ onSubmit }) => {
  const style = useStyle();

  const form = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box className={style.form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputTextField
          name="fullname"
          placeholder="Please enter your fullname"
          form={form}
        />
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
        <InputPassworldField
          name="passwordConfirm"
          form={form}
          placeholder="Please confirm your password"
        />
        <Button
          type="submit"
          className={style.submitButton}
          fullWidth
          color="success"
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
