import { Box, Button, Divider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { IUser } from "../models/user";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputTextField from "../components/InputField/InputTextField/InputTextField";
import { makeStyles } from "@mui/styles";
import InputListTextField from "../components/InputField/InputListTextField/InputListTextField";
import React from "react";
import { updateMe } from "../reduxSlice/authSlice";

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
    education: yup.array().min(0).max(10).of(yup.string()),
  })
  .required();

const useStyle = makeStyles({
  form: {
    justifyContent: "space-between !important",
    display: "flex !important",
    padding: "10px",
  },
});

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const style = useStyle();
  const form = useForm<Partial<IUser>>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      fullname: me.fullname,
      address: me.address,
      education: me.education,
      job: me.job,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (data: Partial<IUser>) => {
    dispatch(updateMe(data));
  };

  return (
    <Box
      sx={{
        width: "80vw",
        marginLeft: "10vw",
        marginTop: "5vh",
        marginBottom: "5vh",
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        padding: "20px",
      }}
    >
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Box className={style.form}>
          <Typography sx={{ padding: "10px", width: "10%" }} variant="h6">
            Fullname
          </Typography>
          <InputTextField
            sxWrap={{ width: "80%" }}
            name="fullname"
            placeholder="Type your fullname here"
            form={form}
            isUnshowInput={true}
          />
        </Box>

        <Divider />
        <Box className={style.form}>
          <Typography sx={{ padding: "10px", width: "10%" }} variant="h6">
            Address
          </Typography>
          <InputTextField
            sxWrap={{ width: "80%" }}
            name="address"
            placeholder="Type your address here"
            form={form}
            isUnshowInput={true}
          />
        </Box>
        <Box className={style.form}>
          <Typography sx={{ padding: "10px", width: "10%" }} variant="h6">
            Education
          </Typography>
          <InputListTextField
            sxWrap={{ width: "80% !important" }}
            sxItem={{
              marginTop: "10px",
              backgroundColor: "#e5e4e4",
              height: "40px",
            }}
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
            sxWrap={{ width: "80%" }}
            name="job"
            placeholder="Type your job"
            form={form}
            isUnshowInput={true}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save
          </Button>
          <Button
            variant="contained"
            color="warning"
            sx={{ marginLeft: "20px" }}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserProfile;
