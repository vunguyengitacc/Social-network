import { UseFormReturn, Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface InputPasswordFieldProp {
  name: string;
  form: UseFormReturn<any>;
  autoComplete?: string;
  placeholder: string;
  label?: string;
}

const InputPassworldField: React.FC<InputPasswordFieldProp> = (props) => {
  const { form, name, placeholder } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];
  const [isHide, setIsHide] = useState<boolean>(true);

  const toggleHidden = () => {
    setIsHide(!isHide);
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth variant="outlined" error={hasError}>
          <OutlinedInput
            sx={{ marginTop: "40px" }}
            {...field}
            placeholder={placeholder}
            type={isHide ? "password" : "text"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleHidden}>
                  {isHide ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default InputPassworldField;
