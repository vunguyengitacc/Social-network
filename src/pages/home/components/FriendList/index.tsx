import { Box, Typography } from "@mui/material";
import { RootState } from "app/store";
import UserItem from "pages/home/components/UserItem";
import { useSelector } from "react-redux";
import friendListStyle from "./style";

export default function FriendList() {
  const me = useSelector((state: RootState) => state.auth.currentUser);
  const style = friendListStyle();
  return (
    <Box className={style.surface}>
      <Typography className={style.title} variant="bold6">
        Friends
      </Typography>
      <Box className={style.listUser}>
        {me?.friends?.map((item) => (
          <UserItem key={item._id} value={item} />
        ))}
      </Box>
    </Box>
  );
}
