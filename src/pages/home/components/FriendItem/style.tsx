import { makeStyles } from "@mui/styles";

const FriendItemStyle = makeStyles({
  box: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#4e4d4d12",
    },
    margin: "5px",
  },
  name: {},
  avatarField: {
    width: "50px",
  },
  avatar: {
    width: "40px !important",
    height: "40px !important",
  },
});

export default FriendItemStyle;
