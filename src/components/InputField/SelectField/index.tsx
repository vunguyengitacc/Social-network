import { Menu, MenuItem, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

interface SelectFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  children: JSX.Element[];
}

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { form, name, children } = props;
  const [choose, setChoose] = useState<null | JSX.Element>(children[0]);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(Boolean(anchor));
  const { errors } = form.formState;
  const hasError = !!errors[name];

  const handleClose = () => {
    setAnchor(null);
    setOpen(false);
  };

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchor(e.currentTarget);
    setOpen(true);
  };

  useEffect(() => {
    form.setValue(name, choose?.props.value);
  }, [choose, form, name]);

  return (
    <>
      <Box component="div" onClick={handleOpen}>
        {choose}
      </Box>
      <Menu open={open} anchorEl={anchor} onClose={handleClose}>
        {children.map((itemCpn) => (
          <MenuItem
            key={itemCpn.key}
            onClick={() => {
              handleClose();
              setChoose(itemCpn);
            }}
          >
            {itemCpn}
          </MenuItem>
        ))}
      </Menu>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <FormControl fullWidth variant="outlined" error={hasError}>
            <OutlinedInput sx={{ display: "none" }} {...field} id={name} />
          </FormControl>
        )}
      />
    </>
  );
};

export default SelectField;
