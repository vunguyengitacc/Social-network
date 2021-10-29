import {
  Hidden,
  IconButton,
  Paper,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SearchField from "../SearchField/SearchField";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IUser } from "../../models/user";
import { useHistory } from "react-router";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Header = () => {
  const [search, setSearch] = useState<boolean>(false);

  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const history = useHistory();

  return (
    <Paper
      sx={{
        height: "50px",
        justifyContent: "space-between",
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: 99,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <IconButton>
          <HomeIcon />
        </IconButton>
        <IconButton onClick={() => setSearch(!search)}>
          <SearchIcon />
        </IconButton>
        {search && (
          <Hidden smDown>
            <SearchField />
          </Hidden>
        )}
      </Box>
      <Box sx={{ marginRight: "20px" }}>
        <IconButton
          sx={{ borderRadius: "0" }}
          onClick={() => history.push("/personal/me")}
        >
          <Avatar
            sx={{
              marginRight: "10px",
            }}
            src={me.avatarUri}
          />
          <Hidden smDown>
            <Typography>{me.fullname}</Typography>
          </Hidden>
        </IconButton>
        <IconButton>
          <ArrowDropDownIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Header;
