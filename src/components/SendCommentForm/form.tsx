import * as yup from "yup";
export const scheme = yup
  .object()
  .shape({
    content: yup
      .string()
      .min(1, "Please enter at least 1 character")
      .max(100, "Please enter at most 100 characters"),
  })
  .required();

export interface IFormComment {
  content: string;
}
