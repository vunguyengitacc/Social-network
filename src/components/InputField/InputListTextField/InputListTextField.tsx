import { Button, IconButton, OutlinedInput, Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { SxProps } from "@mui/system";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import _ from "lodash";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

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
  sxWrap?: SxProps;
  sxItem?: SxProps;
  sxInput?: SxProps;
  sxButtonAdd?: SxProps;
}

const InputListTextField: React.FC<InputListTextProps> = (props) => {
  const { form, name, placeholder } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];

  const [list, setList] = useState<string[]>([...form.getValues()[name]]);
  const [switchForm, setSwitchForm] = useState<boolean>(false);

  const addToList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value?.length > 0) {
      form.setValue(
        name,
        _.uniqWith([...form.getValues()[name], e.currentTarget.value])
      );
      e.currentTarget.value = "";
    }
  };

  useEffect(() => {
    setList(_.uniqWith([...form.getValues()[name]]));
    // eslint-disable-next-line
  }, [form.getValues()[name]]);

  const removeValue = (value: string) => {
    let temp = list.filter((i) => i !== value);
    setList(list.filter((i) => i !== value));
    form.setValue(name, temp);
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl error={hasError} fullWidth sx={props.sxWrap}>
          {switchForm === false ? (
            <Button
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                height: "40px",
                ...props.sxButtonAdd,
              }}
              startIcon={<ControlPointIcon />}
              onClick={() => setSwitchForm(true)}
            >
              Add
            </Button>
          ) : (
            <OutlinedInput
              onBlur={() => setSwitchForm(false)}
              type="text"
              sx={props.sxInput}
              placeholder={placeholder}
              onKeyDown={addToList}
              autoFocus
            />
          )}

          {list.map((i) => (
            <Paper
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                ...props.sxItem,
              }}
            >
              {i}
              <IconButton onClick={() => removeValue(i)}>
                <CloseIcon />
              </IconButton>
            </Paper>
          ))}
        </FormControl>
      )}
    />
  );
};

export default InputListTextField;
