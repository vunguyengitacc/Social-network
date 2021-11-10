import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AppDispatch, RootState } from "app/store";
import InputTextField from "components/InputField/InputTextField";
import SelectField from "components/InputField/SelectField";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IFormAddImageValues, scheme } from "./form";
import useAddStoryFormStyles from "./style";
import PublicIcon from "@mui/icons-material/Public";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";
import { getSizeDynamic } from "utillity/file";
import { addStory } from "reduxSlice/storySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import theme from "app/theme";

const AddStoryForm = () => {
  const [files, setFiles] = useState<File[]>([]);

  const match = useMediaQuery(theme.breakpoints.up("sm"));
  const me = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<IFormAddImageValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      content: "",
      isPrivate: false,
    },
    resolver: yupResolver(scheme),
  });

  const submitForm: SubmitHandler<IFormAddImageValues> = async (data) => {
    const formData = new FormData();
    try {
      if (files) {
        formData.append("content", data.content);
        formData.append("isPrivate", String(data.isPrivate));
        // eslint-disable-next-line
        files.map((item) => {
          formData.append("file", item);
        });
        dispatch(addStory(formData)).then(unwrapResult);
      } else {
        form.reset();
        setFiles([]);
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    let isError = !!form.formState.errors["content"];
    let errorMsg = form.formState.errors["content"]?.message ?? "";
    if (isError) toast.error(errorMsg);
  }, [form.formState]);

  const setImage = (e: ChangeEvent<HTMLInputElement>) => {
    let newFile = e.currentTarget.files?.item(0);
    if (newFile) {
      setFiles([...files, newFile]);
    }
  };

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    let index = Number(e.currentTarget.value);
    setFiles(files.filter((i, idx) => idx !== index));
  };

  const style = useAddStoryFormStyles();
  return (
    <Box className={style.surface}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <Box className={style.contentSurface}>
          <Avatar className={style.avatar} src={me.avatarUri} />
          <InputTextField
            isHideError={true}
            placeholder="Enter your content message"
            form={form}
            name="content"
          />
        </Box>

        {files.map((item, index) => (
          <Box key={index} className={style.inputFile}>
            <Box className={style.inputFileValue}>
              <Typography>{item.name}</Typography>
              <Typography>{getSizeDynamic(item)}</Typography>
            </Box>
            <Button value={index} onClick={removeImage} color="error">
              X
            </Button>
          </Box>
        ))}
        <Divider variant="middle" />
        <Box className={style.contentSurface}>
          <SelectField
            form={form}
            name="isPrivate"
            sxShowSelect={{ maxWidth: "40px" }}
          >
            <Button startIcon={<PublicIcon />} value={"false"}>
              {match && "Public"}
            </Button>
            <Button startIcon={<PrivacyTipIcon />} value={"true"} color="error">
              {match && "Private"}
            </Button>
          </SelectField>
          <Divider orientation="vertical" variant="middle" />
          <input
            style={{ display: "none" }}
            accept="image/png, image/gif, image/jpeg"
            id="contained-button-file"
            multiple
            type="file"
            onChange={setImage}
          />
          <label htmlFor="contained-button-file">
            <Button
              className={match ? style.button : style.smallBtn}
              startIcon={<AttachmentIcon />}
              component="span"
              variant="contained"
            >
              {match && "Image"}
            </Button>
          </label>
          <Button
            className={match ? style.button : style.smallBtn}
            startIcon={<SendIcon />}
            type="submit"
            variant="contained"
            color="success"
          >
            {match && "Send"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddStoryForm;
