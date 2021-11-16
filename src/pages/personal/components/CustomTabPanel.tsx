import { Typography, Box, useMediaQuery } from "@mui/material";
import theme from "app/theme";
import React from "react";

interface IProps {
  text: string;
  startIcon: React.ReactNode;
}

const CustomTabPanel: React.FC<IProps> = (props) => {
  const match = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box display="flex" justifyContent="flex-start" gap="20px">
      {props.startIcon}
      {match && (
        <Typography sx={{ width: "100%" }} variant="bold4">
          {props.text}
        </Typography>
      )}
    </Box>
  );
};

export default CustomTabPanel;
