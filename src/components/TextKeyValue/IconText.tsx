import { Box, Typography } from "@mui/material";
import React from "react";

interface IProps {
  value: any;
  startIcon: JSX.Element;
}

const IconText: React.FC<IProps> = (props) => {
  const Icon: React.FC = () => {
    return props.startIcon;
  };
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", margin: "20px 0  20px 0" }}
    >
      <Box sx={{ marginRight: "10px" }}>{props.startIcon && <Icon />}</Box>
      <Typography variant="h6">{props.value}</Typography>
    </Box>
  );
};

export default IconText;
