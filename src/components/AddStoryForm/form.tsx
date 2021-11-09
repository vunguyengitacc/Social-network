import * as yup from "yup";
export const scheme = yup
  .object()
  .shape({
    content: yup.string().min(5).max(35, "Please enter at mosts 35 characters"),
    isPrivate: yup.bool(),
  })
  .required();

export interface IFormAddImageValues {
  content: string;
  isPrivate: boolean;
}
