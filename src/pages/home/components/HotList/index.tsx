import { Box, Typography } from "@mui/material";
import userApi from "api/userApi";
import UserSkeleton from "components/skeletons/User";
import { IUser } from "models/user";
import UserItem from "pages/home/components/UserItem";
import React, { useEffect, useState } from "react";
import useHotListStyles from "./style";

export default function HotList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const style = useHotListStyles();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await userApi.getRecommend();
      setUsers(data.users);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Box className={style.surface}>
      <Typography className={style.title} variant="bold6">
        Recommend
      </Typography>
      {isLoading && <UserSkeleton amount={5} />}
      {!isLoading && (
        <Box className={style.listUser}>
          {users.length === 0 ? (
            <Box className={style.defaultCard}>
              <Typography variant="bold4" color="#959595">
                Maybe you are the only one here :))
              </Typography>
            </Box>
          ) : (
            users.map((item) => <UserItem key={item._id} value={item} />)
          )}
        </Box>
      )}
    </Box>
  );
}
