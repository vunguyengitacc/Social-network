import { Box, Typography } from "@mui/material";
import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface IProps {
  value: any;
  listValue?: string[] | undefined;
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
      <Box sx={{ marginRight: "10px", marginTop: "5px" }}>
        {props.startIcon && <Icon />}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">
          {props.value}{" "}
          {props.listValue?.length === 1 ? props.listValue[0] : ""}{" "}
        </Typography>
        {props.listValue &&
          props.listValue.length > 1 &&
          props.listValue.map((i) => (
            <Box key={i} sx={{ display: "flex", flexDirection: "row" }}>
              <FiberManualRecordIcon
                sx={{ fontSize: ".75rem", marginRight: "10px", height: "20px" }}
              />
              <Typography> {i}</Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default IconText;
