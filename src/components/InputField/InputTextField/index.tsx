import { FormHelperText, Typography, Box, IconButton } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { makeStyles } from "@mui/styles";
import { SxProps } from "@mui/system";
import React, { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";

interface InputFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  autoComplete?: string;
  sxWrap?: SxProps;
  sxInput?: SxProps;
  sxText?: SxProps;
  isUnshowInput?: boolean;
  focusComponent?: JSX.Element;
}

const defaultStyle = makeStyles({
  text: {
    padding: "10px",
    backgroundColor: "transparent",
    border: "solid 2px transparent",
  },
  input: {},
});

const InputTextField: React.FC<InputFieldProps> = (props) => {
  const [switchForm, setSwitchForm] = useState<boolean>(
    !props.isUnshowInput ?? true
  );

  const { form, name, disabled, placeholder } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];

  const style = defaultStyle();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl
          sx={props.sxWrap}
          fullWidth
          variant="outlined"
          error={hasError}
        >
          {props.isUnshowInput && switchForm === false && !hasError && (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography className={style.text} sx={props.sxText}>
                {form.getValues()[name]}
              </Typography>
              <IconButton
                sx={{ padding: "10px" }}
                onClick={() => setSwitchForm(true)}
              >
                <EditIcon />
              </IconButton>
            </Box>
          )}
          {(!props.isUnshowInput || switchForm === true || hasError) && (
            <OutlinedInput
              className={style.input}
              sx={props.sxInput}
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              id={name}
              onChange={(e) => {
                form.setValue(name, e.currentTarget.value);
              }}
              autoFocus
              onBlur={() => {
                if (props.isUnshowInput === true) setSwitchForm(false);
              }}
            />
          )}
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default InputTextField;
