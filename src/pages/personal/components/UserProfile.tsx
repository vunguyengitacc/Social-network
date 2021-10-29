import { Box, Button, Divider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { IUser } from "../../../models/user";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputTextField from "../../../components/InputField/InputTextField/InputTextField";
import { makeStyles } from "@mui/styles";
import InputListTextField from "../../../components/InputField/InputListTextField/InputListTextField";
import React from "react";
import {
  updateAvatar,
  updateBackground,
  updateMe,
} from "../../../reduxSlice/authSlice";
import { throwAlert } from "../../../reduxSlice/UISlice";

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
    padding: "20px",
    margin: "3vh 10vh 3vh 10vh",
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
  formInputField: {
    justifyContent: "space-between !important",
    display: "flex !important",
    padding: "10px",
    width: "80vw",
  },
});

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const style = useStyle();
  const form = useForm<
    Pick<IUser, "fullname" | "address" | "education" | "job">
  >({
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

  const handleSubmit = (
    data: Pick<IUser, "fullname" | "address" | "education" | "job">
  ) => {
    dispatch(updateMe(data));
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0);
    if (file && file.type.match(/(png|jpg|jpge)/)) {
      const payload = new FormData();
      payload.append("file", file);
      dispatch(updateAvatar(payload));
    } else {
      dispatch(
        throwAlert({
          isShow: true,
          message: "Please choose image file",
          type: "error",
        })
      );
    }
  };

  const handleChangeBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0);
    if (file && file.type.match(/(png|jpg|jpge)/)) {
      const payload = new FormData();
      payload.append("file", file);
      dispatch(updateBackground(payload));
    } else {
      dispatch(
        throwAlert({
          isShow: true,
          message: "Please choose image file",
          type: "error",
        })
      );
    }
  };

  return (
    <Box>
      <Box className={style.form}>
        <Box className={style.formInputField} sx={{ alignItems: "center" }}>
          <Typography sx={{ padding: "10px", width: "10%" }} variant="h6">
            Avatar
          </Typography>
          <Box sx={{ width: "60%", display: "flex", alignItems: "flex-end" }}>
            <img
              src={me.avatarUri}
              style={{
                width: "300px",
                minHeight: "30px",
                maxHeight: "300px",
                border: ".5px solid gray",
              }}
              alt=""
            />

            <input
              style={{ display: "none" }}
              accept="image/png, image/gif, image/jpeg"
              id="avatar-input"
              multiple
              type="file"
              onChange={handleChangeAvatar}
            />
            <label htmlFor="avatar-input">
              <Button
                variant="contained"
                component="span"
                sx={{ height: "40px", width: "302px", marginLeft: "-302px" }}
              >
                Change Avatar
              </Button>
            </label>
          </Box>
        </Box>
      </Box>
      <Box className={style.form}>
        <Box className={style.formInputField} sx={{ alignItems: "center" }}>
          <Typography sx={{ padding: "10px", width: "10%" }} variant="h6">
            Background
          </Typography>
          <Box sx={{ width: "60%", display: "flex", alignItems: "flex-end" }}>
            <img
              src={me.backgroundUrl}
              style={{
                width: "300px",
                minHeight: "30px",
                maxHeight: "300px",
                border: ".5px solid gray",
              }}
              alt=""
            />

            <input
              style={{ display: "none" }}
              accept="image/png, image/gif, image/jpeg"
              id="background-input"
              multiple
              type="file"
              onChange={handleChangeBackground}
            />
            <label htmlFor="background-input">
              <Button
                variant="contained"
                component="span"
                sx={{ height: "40px", width: "302px", marginLeft: "-302px" }}
              >
                Change Background
              </Button>
            </label>
          </Box>
        </Box>
      </Box>
      <Box className={style.form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Box className={style.formInputField}>
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
          <Box className={style.formInputField}>
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
          <Box className={style.formInputField}>
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
          <Box className={style.formInputField}>
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
    </Box>
  );
};

export default UserProfile;
