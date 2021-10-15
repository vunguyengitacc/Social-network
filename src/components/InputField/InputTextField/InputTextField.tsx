import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Controller, UseFormReturn } from "react-hook-form";

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
}

const InputTextField: React.FC<InputFieldProps> = (props) => {
  const { form, name, disabled, placeholder } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth variant="outlined" error={hasError}>
          <OutlinedInput
            sx={{ marginTop: "40px" }}
            {...field}
            disabled={disabled}
            placeholder={placeholder}
            id={name}
          />
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default InputTextField;