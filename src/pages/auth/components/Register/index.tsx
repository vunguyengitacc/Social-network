import Box from "@mui/material/Box";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React from "react";
import { Button } from "@mui/material";
import InputTextField from "components/InputField/InputTextField";
import InputPassworldField from "components/InputField/InputPasswordField";
import useRegisterStyles from "./style";
import { registerSchema, IRegisterFormValues } from "./form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { register } from "reduxSlice/authSlice";
import toast from "react-hot-toast";
import { unwrapResult } from "@reduxjs/toolkit";

const RegisterForm: React.FC = (props) => {
  const style = useRegisterStyles();
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const submitRegister = async (data: IRegisterFormValues) => {
    const toastId = toast.loading("Loading");
    try {
      await dispatch(register(data)).then(unwrapResult);
      toast.success("Successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <Box className={style.form}>
      <form onSubmit={form.handleSubmit(submitRegister)}>
        <InputTextField
          name="fullname"
          placeholder="Please enter your fullname"
          form={form}
        />
        <InputTextField
          sxInput={{ marginTop: "40px" }}
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
