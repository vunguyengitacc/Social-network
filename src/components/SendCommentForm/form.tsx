import * as yup from "yup";
export const scheme = yup
  .object()
  .shape({
    content: yup.string().max(100, "Please enter at mosts 100 characters"),
  })
  .required();

export interface IFormComment {
  content: string;
}
