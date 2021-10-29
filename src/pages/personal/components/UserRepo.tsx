import { Hidden, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { initialUser, IUser } from "../../../models/user";
import { RootState } from "../../../app/store";
import userApi from "../../../api/userApi";
import AddImageDialog from "../../../components/AddImageDialog/AddImageDialog";
import Sidebar from "../../../components/Sidebar/Sidebar";
import StoryList from "../../../components/StoriesList/StoryList";

export interface IStoryPageParams {
  user: string;
  option: string;
}

const UserRepository = () => {
  const [isMe, setIsMe] = useState<boolean>(false);
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [userInfor, setUserInfor] = useState<IUser>(initialUser);
  const history = useHistory();

  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const { user } = useParams<IStoryPageParams>();

  useEffect(() => {
    (async () => {
      if (user === "me") {
        setUserInfor(me);
        setIsMe(true);
      } else {
        const response = await userApi.getById(user);
        setUserInfor(response.data.user);
        if (response.data.user?._id === me._id)
          history.push("/personal/stories/me");
        setIsMe(false);
      }
    })();
  }, [user, me, history]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      {isMe && <AddImageDialog setOpen={setIsShowAdd} open={isShowAdd} />}
      <Hidden smDown>
        <Box
          sx={{
            width: "80vw",
            paddingLeft: "10vw",
            display: "flex",
          }}
        >
          <Box sx={{ width: "30%", paddingTop: "3vh" }}>
            <Sidebar userInfor={userInfor} />
          </Box>
          <Box sx={{ marginLeft: "5%", width: "65%", paddingTop: "3vh" }}>
            {isMe && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginBottom: "20px", height: "50px" }}
                startIcon={<AddCircleIcon />}
                onClick={() => setIsShowAdd(true)}
              >
                Upload Image
              </Button>
            )}
            <StoryList isMe={isMe} />
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};

export default UserRepository;
