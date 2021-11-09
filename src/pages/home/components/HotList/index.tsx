import { Box, Typography } from "@mui/material";
import userApi from "api/userApi";
import { IUser } from "models/user";
import UserItem from "pages/home/components/UserItem";
import React, { useEffect, useState } from "react";
import useHotListStyles from "./style";

export default function HotList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const style = useHotListStyles();

  useEffect(() => {
    (async () => {
      const { data } = await userApi.getRecommend();
      setUsers(data.users);
    })();
  }, []);

  return (
    <Box className={style.surface}>
      <Typography className={style.title} variant="bold6">
        Recommend
      </Typography>
      <Box className={style.listUser}>
        {users.map((item) => (
          <UserItem key={item._id} value={item} />
        ))}
      </Box>
    </Box>
  );
}
