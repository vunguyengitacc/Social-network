import {
  Hidden,
  IconButton,
  Paper,
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Badge,
  SwipeableDrawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchField from "../SearchField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { useHistory } from "react-router";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "reduxSlice/authSlice";
import notificationApi from "api/notificationApi";
import { INotification } from "models/notification";
import NotificationItem from "../NotificationItem";
import headerStyles from "./style";
import logo from "images/Logo.png";
import SearchBar from "components/SearchBar";
import { socketClient } from "app/socket";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const style = headerStyles();
  const me = useSelector((state: RootState) => state.auth.currentUser);
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    const response = await notificationApi.getAllToMe();
    setNotifications(response.data.notifications);
  };

  const handleClose = () => {
    setAnchor(null);
    setOpenNotification(false);
  };

  const handleOpenMenu = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
    await fetchNotification();
    await setOpenNotification(true);
  };

  useEffect(() => {
    socketClient.on("notification/add", (data) => {
      if (data.notification.from._id !== me._id)
        setNotifications([...notifications, data.notification]);
    });
    socketClient.on("notification/delete", (data) => {
      let notificationTemp = notifications.filter((i) => i._id !== data.id);
      setNotifications(notificationTemp);
    });
  });

  const history = useHistory();

  return (
    <Paper className={style.surface}>
      <Menu open={openNotification} anchorEl={anchor} onClose={handleClose}>
        {notifications.length === 0 && (
          <MenuItem key={"null"}>
            <Typography>Nothing new !!!</Typography>
          </MenuItem>
        )}
        {notifications.map((item) => (
          <MenuItem key={item._id}>
            <NotificationItem notification={item} />
          </MenuItem>
        ))}
      </Menu>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          sx={{ width: "70px", height: "50px" }}
          onClick={() => history.push("/home")}
        >
          <img style={{ width: "50px", height: "50px" }} src={logo} alt="" />
        </Button>
        <Hidden mdDown>
          <SearchField />
        </Hidden>
        <Hidden mdUp>
          <IconButton onClick={() => setOpenSearch(true)}>
            <SearchIcon />
          </IconButton>
          <SwipeableDrawer
            open={openSearch}
            onOpen={() => setOpenSearch(true)}
            onClose={() => setOpenSearch(false)}
          >
            <SearchBar onClose={() => setOpenSearch(false)} />
          </SwipeableDrawer>
        </Hidden>
      </Box>
      <Box sx={{ marginRight: "20px" }}>
        <IconButton onClick={handleOpenMenu}>
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
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
        <IconButton onClick={() => dispatch(logout())}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Header;
