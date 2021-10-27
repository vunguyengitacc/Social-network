import { FormHelperText, InputBase, Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { SxProps } from "@mui/system";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import _ from "lodash";

interface InputListTextProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  size?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  endAdornment?: JSX.Element;
  sxValue?: SxProps;
  sxItem?: SxProps;
}

const InputListTextField: React.FC<InputListTextProps> = (props) => {
  const { form, name, placeholder } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];

  const [list, setList] = useState<string[]>([]);

  const addToList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value?.length > 0) {
      setList(_.uniqWith([...list, e.currentTarget.value]));
      console.log(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  useEffect(() => {
    console.log(list);
    form.setValue(name, list);
  }, [list]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl error={hasError} fullWidth>
          {list.map((i) => (
            <Paper key={i} sx={props.sxItem}>
              {i}
            </Paper>
          ))}
          <InputBase
            sx={props.sxValue}
            placeholder={placeholder}
            fullWidth
            onKeyDown={addToList}
          />
          {errors[name] && (
            <FormHelperText>{errors[name]?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default InputListTextField;
