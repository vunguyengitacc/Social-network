import { Box, Divider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { IUser } from "../models/user";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputTextField from "../components/InputField/InputTextField/InputTextField";
import { makeStyles } from "@mui/styles";
import InputListTextField from "../components/InputField/InputListTextField/InputListTextField";

const schema = yup
  .object()
  .shape({
    fullname: yup
      .string()
      .required("Please enter your full name")
      .min(6, "Please enter at least 6 characters.")
      .max(35, "Please enter at most 35 characters"),
    address: yup.string().max(100, "Please enter at most 100 characters"),
    job: yup.string().max(100, "Please enter at most 100 characters"),
    education: yup.string().max(100, "Please enter at most 100 characters"),
  })
  .required();

interface IPropsForm {
  fullname: string;
  address: string;
  education: string;
  job: string;
}

const useStyle = makeStyles({
  form: {
    justifyContent: "space-between",
    display: "flex",
    padding: "10px",
  },
});

const UserProfile: React.FC = () => {
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const style = useStyle();
  const form = useForm<IPropsForm>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      fullname: me.fullname,
      address: "",
      education: "",
      job: me.job,
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box
      sx={{
        width: "80vw",
        marginLeft: "10vw",
        marginTop: "5vh",
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        padding: "20px",
      }}
    >
      <Box className={style.form}>
        <Typography sx={{ padding: "10px", width: "10%" }} variant="h6">
          Fullname
        </Typography>
        <InputTextField
          sxValue={{ width: "80%" }}
          name="fullname"
          placeholder="Type your fullname here"
          form={form}
        />
      </Box>

      <Divider />
      <Box className={style.form}>
        <Typography sx={{ padding: "10px", width: "10%" }} variant="h6">
          Address
        </Typography>
        <InputTextField
          sxValue={{ width: "80%" }}
          name="address"
          placeholder="Type your address here"
          form={form}
        />
      </Box>
      <Box className={style.form}>
        <Typography sx={{ padding: "10px", width: "10%" }} variant="h6">
          Education
        </Typography>
        <InputListTextField
          sxValue={{ width: "80%" }}
          sxItem={{ width: "80%" }}
          name="education"
          placeholder="Type your schools"
          form={form}
        />
      </Box>
      <Box className={style.form}>
        <Typography sx={{ padding: "10px", width: "10%" }} variant="h6">
          Job
        </Typography>
        <InputTextField
          sxValue={{ width: "80%" }}
          name="job"
          placeholder="Type your job"
          form={form}
        />
      </Box>
    </Box>
  );
};

export default UserProfile;
