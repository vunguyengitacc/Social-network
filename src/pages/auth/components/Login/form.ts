import * as yup from "yup";

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

export default schema;
