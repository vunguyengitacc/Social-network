import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import React from "react";
import { makeStyles } from "@mui/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addStory } from "../../reduxSlice/storySlice";

interface IPropsDialog {
  open: Boolean;
}

const scheme = yup
  .object()
  .shape({
    content: yup.string().max(35, "Please enter at mosts 35 characters"),
    files: yup.mixed().required("Please choose a file"),
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
  files: any;
}

const AddImageDialog: React.FC<IPropsDialog> = ({ open }) => {
  const style = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<IFormAddImageValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      content: "",
      files: [],
    },
    resolver: yupResolver(scheme),
  });

  const submitForm = (data: IFormAddImageValues) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("files", data.files);
    dispatch(addStory(formData));
  };

  return (
    <Dialog open={true}>
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
            {...form.register("files")}
            type="file"
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
        <DialogActions>
          <Button>Cancel</Button>
          <Button type="submit">Send</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddImageDialog;
