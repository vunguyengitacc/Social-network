import React, { useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import { Tab, Box, Typography, Button } from "@mui/material";
import CustomTabPanel from "../CustomTabPanel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { IUser } from "models/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputTextField from "components/InputField/InputTextField";
import { updateMe } from "reduxSlice/authSlice";
import InputListTextField from "components/InputField/InputListTextField";
import userProfileStyles, { StyledListTab } from "./style";
import theme from "app/theme";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import scheme from "./form";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

const UserProfile = () => {
  const [panel, setPanel] = useState("profile-1");
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const style = userProfileStyles(theme);
  const { basicScheme, contactScheme, workScheme } = scheme;

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

  const debounceCall = debounce(
    (data: Partial<IUser>) => updateInfor(data),
    2000
  );

  const updateInfor = async (data: Partial<IUser>) => {
    const toastId = toast.loading("Loading");
    try {
      await dispatch(updateMe(data)).then(unwrapResult);
      toast.success("Success", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const handleSubmit = React.useCallback((data: Partial<IUser>) => {
    debounceCall(data);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <TabContext value={panel}>
        <Box className={style.surface}>
          <StyledListTab orientation="vertical" onChange={swicthPanel}>
            <Tab
              sx={{ alignItems: "flex-start" }}
              label={
                <CustomTabPanel
                  startIcon={<AccountBalanceIcon />}
                  text="General"
                />
              }
              value="profile-1"
            />
            <Tab
              sx={{ alignItems: "flex-start" }}
              label={
                <CustomTabPanel startIcon={<BorderAllIcon />} text="Basic" />
              }
              value="profile-2"
            />
            <Tab
              sx={{ alignItems: "flex-start" }}
              label={
                <CustomTabPanel
                  startIcon={<WorkOutlineIcon />}
                  text="Job and education"
                />
              }
              value="profile-3"
            />
            <Tab
              sx={{ alignItems: "flex-start" }}
              label={
                <CustomTabPanel
                  startIcon={<PhoneIphoneIcon />}
                  text="Contact"
                />
              }
              value="profile-4"
            />
          </StyledListTab>
          <Box sx={{ width: "-webkit-fill-available" }}>
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
              <form onChange={basicForm.handleSubmit(handleSubmit)}>
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
              <form onSubmit={workAndEduForm.handleSubmit(handleSubmit)}>
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
                <Box className={style.saveField}>
                  <Button
                    color="warning"
                    onClick={() => workAndEduForm.reset()}
                  >
                    Recover
                  </Button>
                  <Button type="submit">Save</Button>
                </Box>
              </form>
            </TabPanel>
            <TabPanel value="profile-4">
              <form onChange={contactForm.handleSubmit(handleSubmit)}>
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
