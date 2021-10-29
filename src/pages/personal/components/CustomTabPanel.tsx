import { Typography } from "@mui/material";
import React from "react";

interface IProps {
  text: string;
}

const CustomTabPanel: React.FC<IProps> = (props) => {
  return (
    <React.Fragment>
      <Typography sx={{ width: "100%" }} variant="bold4">
        {props.text}
      </Typography>
    </React.Fragment>
  );
};

export default CustomTabPanel;
