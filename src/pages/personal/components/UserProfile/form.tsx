import * as yup from "yup";
const basicScheme = yup.object().shape({
  fullname: yup
    .string()
    .required()
    .max(50, "Please input at most 100 characters")
    .min(6, "Please input at least 6 characters"),
  address: yup
    .string()
    .max(100, "Please input at most 100 characters")
    .min(6, "Please input at least 6 characters"),
});

const contactScheme = yup.object().shape({
  phone: yup.string().matches(
    // eslint-disable-next-line
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    "invalid phone number"
  ),
});

const workScheme = yup.object().shape({
  job: yup.array().of(yup.string()).max(10),
  education: yup.array().of(yup.string()).max(10),
});

const scheme = { basicScheme, contactScheme, workScheme };
export default scheme;
