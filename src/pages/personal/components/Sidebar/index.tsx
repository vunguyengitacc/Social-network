import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { IUser } from "models/user";
import IconText from "components/TextKeyValue/IconText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import sidebarStyle from "./style";
import theme from "app/theme";
import dateUtil from "utillity/date";

interface IProps {
  userInfor: IUser;
}

const Sidebar: React.FC<IProps> = (props) => {
  const style = sidebarStyle(theme);
  return (
    <Box className={style.surface}>
      <Box className={style.contentSurface}>
        <Typography variant="bold6" sx={{ margin: "10px" }}>
          Profile Information
        </Typography>
        <Divider variant="middle" />
        {props.userInfor?.address && (
          <IconText
            startIcon={<HomeIcon />}
            text="Living in"
            values={[props.userInfor?.address]}
          />
        )}
        {props.userInfor?.education?.length > 0 && (
          <IconText
            startIcon={<MenuBookIcon />}
            text="Studied in"
            values={props.userInfor?.education}
          />
        )}
        {props.userInfor?.job.length > 0 && (
          <IconText
            startIcon={<WorkIcon />}
            text="Work at "
            values={props.userInfor?.job}
          />
        )}
        {props.userInfor?.phone && (
          <IconText
            startIcon={<MenuBookIcon />}
            text="Phone number"
            values={[props.userInfor?.phone]}
          />
        )}
        <IconText
          startIcon={<AccessTimeIcon />}
          text="Join at"
          values={[
            dateUtil.getDateMeaning(new Date(props.userInfor?.createdAt)),
          ]}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
