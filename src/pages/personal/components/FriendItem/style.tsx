import { makeStyles } from "@mui/styles";

const FriendItemStyle = makeStyles({
  box: {
    height: "100px",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#4e4d4d12",
    },
    margin: "10px",
  },
  name: {},
  avatarField: {
    width: "100px",
  },
  avatar: {
    width: "80px !important",
    height: "80px !important",
  },
});

export default FriendItemStyle;
