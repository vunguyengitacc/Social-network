import Box from "@mui/material/Box";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React from "react";
import { Button } from "@mui/material";
import InputTextField from "components/InputField/InputTextField";
import InputPassworldField from "components/InputField/InputPasswordField";
import useRegisterStyles from "./style";
import { registerSchema, IRegisterFormValues } from "./form";

interface IRegisterProp {
  onSubmit: (data: IRegisterFormValues) => void;
}

const RegisterForm: React.FC<IRegisterProp> = ({ onSubmit }) => {
  const style = useRegisterStyles();

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

  return (
    <Box className={style.form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
