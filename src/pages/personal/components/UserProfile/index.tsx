import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Box, Typography } from "@mui/material";
import CustomTabPanel from "../CustomTabPanel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { IUser } from "models/user";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputTextField from "components/InputField/InputTextField";
import { updateMe } from "reduxSlice/authSlice";
import InputListTextField from "components/InputField/InputListTextField";
import { withStyles } from "@mui/styles";
import userProfileStyles from "./style";
import theme from "app/theme";

const StyledListTab = withStyles({
  indicator: {
    backgroundColor: "#e7f3ff",
    opacity: ".6",
    color: "red",
    width: "100%",
    borderRadius: "10px",
  },
  "& .Mui-selected": {
    color: "black",
  },
})(TabList);

const basicScheme = yup.object().shape({
  fullname: yup
    .string()
    .required()
    .max(100, "Please input at most 100 characters")
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

const UserProfile = () => {
  const [panel, setPanel] = useState("profile-1");

  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const style = userProfileStyles(theme);

  const basicForm = useForm<Pick<IUser, "fullname" | "address">>({
    mode: "onSubmit",
    defaultValues: {
      fullname: me.fullname,
      address: me.address,
    },
    resolver: yupResolver(basicScheme),
  });

  const contactForm = useForm<Pick<IUser, "phone">>({
    mode: "onSubmit",
    defaultValues: {
      phone: me.phone,
    },
    resolver: yupResolver(contactScheme),
  });

  const workAndEduForm = useForm<Pick<IUser, "job" | "education">>({
    mode: "onChange",
    defaultValues: {
      job: me.job,
      education: me.education,
    },
    resolver: yupResolver(workScheme),
  });

  const swicthPanel = (event: React.SyntheticEvent, newValue: string) => {
    setPanel(newValue);
  };

  const updateInfor = (data: Partial<IUser>) => {
    dispatch(updateMe(data));
  };

  return (
    <React.Fragment>
      <TabContext value={panel}>
        <Box className={style.surface}>
          <StyledListTab
            orientation="vertical"
            sx={{ width: "35%" }}
            onChange={swicthPanel}
          >
            <Tab label={<CustomTabPanel text="General" />} value="profile-1" />
            <Tab label={<CustomTabPanel text="Basic" />} value="profile-2" />
            <Tab
              label={<CustomTabPanel text="Job and education" />}
              value="profile-3"
            />
            <Tab label={<CustomTabPanel text="Contact" />} value="profile-4" />
          </StyledListTab>
          <Box sx={{ width: "65%" }}>
            <TabPanel value="profile-1">
              <Box>
                <Typography
                  sx={{ margin: " 0 10px 10px 10px " }}
                  variant="bold6"
                >
                  Fullname
                </Typography>
                <Typography sx={{ margin: " 0 10px 10px 10px " }}>
                  {me.fullname}
                </Typography>
              </Box>
              {me.education.length > 0 && (
                <Box>
                  <Typography
                    sx={{ margin: " 0 10px 10px 10px " }}
                    variant="bold6"
                  >
                    Education
                  </Typography>
                  <Typography sx={{ margin: " 0 10px 10px 10px " }}>
                    Studying in{" "}
                    <b style={{ marginLeft: "10px" }}>{me.education[0]}</b>
                  </Typography>
                </Box>
              )}
            </TabPanel>
            <TabPanel value="profile-2">
              <form onSubmit={basicForm.handleSubmit(updateInfor)}>
                <Box>
                  <Typography
                    sx={{ margin: " 0 10px 10px 10px " }}
                    variant="bold6"
                  >
                    Fullname
                  </Typography>
                  <InputTextField
                    isUnshowInput={true}
                    form={basicForm}
                    name="fullname"
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{ margin: " 0 10px 10px 10px " }}
                    variant="bold6"
                  >
                    Address
                  </Typography>
                  <InputTextField
                    form={basicForm}
                    name="address"
                    isUnshowInput={true}
                  />
                </Box>
              </form>
            </TabPanel>
            <TabPanel value="profile-3">
              <form onSubmit={workAndEduForm.handleSubmit(updateInfor)}>
                <Box>
                  <Typography
                    sx={{ margin: " 0 10px 10px 10px " }}
                    variant="bold6"
                  >
                    Jobs
                  </Typography>
                  <InputListTextField
                    sxItem={{ marginTop: "10px", backgroundColor: "#e9e9e9" }}
                    name="job"
                    form={workAndEduForm}
                  />
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Typography
                    sx={{ margin: " 0 10px 10px 10px " }}
                    variant="bold6"
                  >
                    Educations
                  </Typography>
                  <InputListTextField
                    sxItem={{ marginTop: "10px", backgroundColor: "#e9e9e9" }}
                    name="education"
                    form={workAndEduForm}
                  />
                </Box>
              </form>
            </TabPanel>
            <TabPanel value="profile-4">
              <form onSubmit={contactForm.handleSubmit(updateInfor)}>
                <Typography
                  sx={{ margin: " 0 10px 10px 10px " }}
                  variant="bold6"
                >
                  Phone
                </Typography>
                <InputTextField
                  isUnshowInput={true}
                  form={contactForm}
                  name="phone"
                />
              </form>
            </TabPanel>
          </Box>
        </Box>
      </TabContext>
    </React.Fragment>
  );
};

export default UserProfile;
