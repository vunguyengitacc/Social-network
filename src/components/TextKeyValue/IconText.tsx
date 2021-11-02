import { Box } from "@mui/material";
import React from "react";

interface IProps {
  text: any;
  values: string[];
  startIcon: JSX.Element;
}

const IconText: React.FC<IProps> = (props) => {
  const Icon: React.FC = () => {
    return props.startIcon;
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        margin: "20px 0  20px 0",
      }}
    >
      <Box sx={{ marginRight: "10px", marginTop: "0px", color: "gray" }}>
        {props.startIcon && <Icon />}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <p style={{ margin: 0, alignItems: "start !important" }}>
          {props.text}
          <span style={{ width: "5px" }} />
          <b> {props.values[0]}</b>
        </p>
      </Box>
    </Box>
  );
};

export default IconText;
