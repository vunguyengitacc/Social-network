import * as yup from "yup";

export const registerSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("Please enter username.")
      .matches(/^[0-9A-Za-z]+$/, "Please enter only alphanum type")
      .min(6, "Please enter at least 6 characters.")
      .max(35, "Please enter at most 35 characters"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(/^[0-9A-Za-z]+$/, "Please enter only alphanum type")
      .min(6, "Please enter at least 6 characters.")
      .max(30, "Please enter at most 30 characters"),
    passwordConfirm: yup
      .string()
      .matches(/^[0-9A-Za-z]+$/, "Please enter only alphanum type")
      .oneOf([yup.ref("password")], "Confirm password must match password"),
    fullname: yup
      .string()
      .required("Please enter your full name")
      .matches(/^[0-9A-Za-z]+$/, "Please enter only alphanum type")
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
