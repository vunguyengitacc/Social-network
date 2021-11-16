import {
  FormControl,
  OutlinedInput,
  Box,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "./style.css";
import { withStyles } from "@mui/styles";

interface IProps {
  name: string;
  form: UseFormReturn<any>;
  autoComplete?: string;
  placeholder: string;
  label?: string;
}

const StyledButton = withStyles({
  root: {
    width: "15px",
  },
})(Button);

const InputRichTextField: React.FC<IProps> = (props) => {
  const { name, form } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];
  const [textState, setTextState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    form.setValue(
      name,
      JSON.stringify(convertToRaw(textState.getCurrentContent()))
    );
    // eslint-disable-next-line
  }, [textState]);

  return (
    <>
      <Box className="editField" width="100%" textAlign="left">
        <Editor
          onChange={(editorState) => setTextState(editorState)}
          editorState={textState}
        />
        <Stack direction="column" marginTop={1}>
          <Stack direction="row" marginTop={1} gap={1}>
            <StyledButton
              color="disable"
              onClick={() =>
                setTextState(RichUtils.toggleInlineStyle(textState, "BOLD"))
              }
            >
              B
            </StyledButton>
            <Divider orientation="vertical" flexItem />
            <StyledButton
              color="disable"
              onClick={() =>
                setTextState(RichUtils.toggleInlineStyle(textState, "ITALIC"))
              }
            >
              <i>I</i>
            </StyledButton>
            <Divider orientation="vertical" flexItem />
            <StyledButton
              color="disable"
              onClick={() =>
                setTextState(
                  RichUtils.toggleInlineStyle(textState, "UNDERLINE")
                )
              }
            >
              <u>U</u>
            </StyledButton>
          </Stack>
          <Stack direction="row" marginTop={1} gap={1}>
            <StyledButton
              color="disable"
              variant={`${active === 1 ? "contained" : "text"}`}
              onClick={() => {
                setTextState(
                  RichUtils.toggleBlockType(textState, "unordered-list-item")
                );
                active === 1 ? setActive(0) : setActive(1);
              }}
            >
              <FormatListBulletedIcon />
            </StyledButton>
            <Divider orientation="vertical" flexItem />
            <StyledButton
              color="disable"
              variant={`${active === 2 ? "contained" : "text"}`}
              onClick={() => {
                setTextState(
                  RichUtils.toggleBlockType(textState, "header-three")
                );
                active === 2 ? setActive(0) : setActive(2);
              }}
            >
              H1
            </StyledButton>
            <Divider orientation="vertical" flexItem />
            <StyledButton
              color="disable"
              variant={`${active === 3 ? "contained" : "text"}`}
              onClick={() => {
                setTextState(
                  RichUtils.toggleBlockType(textState, "header-four")
                );
                active === 3 ? setActive(0) : setActive(3);
              }}
            >
              H2
            </StyledButton>
          </Stack>
        </Stack>
      </Box>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <FormControl variant="outlined" error={hasError}>
            <OutlinedInput sx={{ display: "none" }} {...field} id={name} />
          </FormControl>
        )}
      />
    </>
  );
};

export default InputRichTextField;
