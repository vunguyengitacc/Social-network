import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import React, { Dispatch, SetStateAction, useState } from "react";
import { makeStyles } from "@mui/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { addStory } from "reduxSlice/storySlice";
import SelectField from "../InputField/SelectField";
import toast from "react-hot-toast";
import { unwrapResult } from "@reduxjs/toolkit";

interface IPropsDialog {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const scheme = yup
  .object()
  .shape({
    content: yup.string().max(35, "Please enter at mosts 35 characters"),
    isPrivate: yup.bool(),
  })
  .required();

const useStyles = makeStyles({
  fileButton: {
    width: "100%",
    marginTop: "20px",
    height: "50px",
  },
});

interface IFormAddImageValues {
  content: string;
  isPrivate: boolean;
}

const AddImageDialog: React.FC<IPropsDialog> = ({ open, setOpen }) => {
  const style = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const [fileName, setFileName] = useState<any>("");
  const [file, setFile] = useState<any>(null);
  const form = useForm<IFormAddImageValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      content: "",
      isPrivate: false,
    },
    resolver: yupResolver(scheme),
  });

  const submitForm: SubmitHandler<IFormAddImageValues> = async (
    data: IFormAddImageValues
  ) => {
    const formData = new FormData();
    const toastId = toast.loading("Loading");
    try {
      if (file && file.type.match(/(png|jpg|jpge)/)) {
        formData.append("content", data.content);
        formData.append("isPrivate", String(data.isPrivate));
        formData.append("file", file);
        dispatch(addStory(formData)).then(unwrapResult);
        setOpen(false);
        toast.success("Success", { id: toastId });
      } else {
        form.reset();
        setFileName(null);
        setFile(null);
        toast.error("Please choose image file", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const addFilesToClipboard = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) return;
    const file = e.currentTarget.value ?? "";
    const data = e.currentTarget.files?.item(0);
    setFileName(file.split(`\\`).pop());
    setFile(data);
  };

  const clearImage = (e: React.FormEvent<HTMLButtonElement>) => {
    form.reset();
    setFileName(null);
  };

  return (
    <Dialog open={open}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <DialogTitle sx={{ width: "40vw" }}>Add New</DialogTitle>
        <DialogContent>
          <TextField
            {...form.register("content")}
            margin="dense"
            fullWidth
            label="Content"
          ></TextField>
          <input
            style={{ display: "none" }}
            accept="image/png, image/gif, image/jpeg"
            id="contained-button-file"
            multiple
            type="file"
            onChange={addFilesToClipboard}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              className={style.fileButton}
            >
              <AddPhotoAlternateIcon />
            </Button>
          </label>
        </DialogContent>
        {fileName && (
          <DialogContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography sx={{ height: "40px", lineHeight: "40px" }}>
              {fileName}
            </Typography>
            <Button color="error" sx={{ height: "40px" }} onClick={clearImage}>
              x
            </Button>
          </DialogContent>
        )}
        <DialogContent>
          <SelectField form={form} name="isPrivate">
            <Button value={"false"}>Public</Button>
            <Button value={"true"}>Private</Button>
          </SelectField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="success" type="submit">
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddImageDialog;
