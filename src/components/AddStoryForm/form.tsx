import * as yup from "yup";
export const scheme = yup
  .object()
  .shape({
    content: yup.string().required("Please type something to content"),
    isPrivate: yup.bool(),
  })
  .required();

export interface IFormAddImageValues {
  content: string;
  isPrivate: boolean;
}
