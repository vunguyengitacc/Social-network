import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory, useParams } from "react-router";
import userApi from "../../api/userApi";
import { RootState } from "../../app/store";
import AddImageDialog from "../../components/AddImageDialog/AddImageDialog";
import Header from "../../components/Header/Header";
import UserHeader from "../../components/UserHeader/UserHeader";
import { IUser } from "../../models/user";
import UserProfile from "./components/UserProfile";
import UserRepository, { IStoryPageParams } from "./components/UserRepo";

const PersonalPage = () => {
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [userInfor, setUserInfor] = useState<IUser>();
  const history = useHistory();

  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const { user } = useParams<IStoryPageParams>();

  useEffect(() => {
    (async () => {
      if (user === "me") {
        setUserInfor(me);
        setIsMe(true);
      } else if (user !== undefined) {
        const response = await userApi.getById(user);
        setUserInfor(response.data.user);
        if (response.data.user?._id === me._id)
          history.push("/personal/stories/me");
        else setIsMe(false);
      }
    })();
  }, [user, me, history]);

  return (
    <React.Fragment>
      {isMe && <AddImageDialog setOpen={setIsShowAdd} open={isShowAdd} />}
      <Header />
      <UserHeader userInfor={userInfor} isMe={isMe} />
      <Switch>
        <Route
          exact
          path={"/personal/stories/:user"}
          component={UserRepository}
        />
        <Route exact path={"/personal/profile/me"} component={UserProfile} />
      </Switch>
    </React.Fragment>
  );
};

export default PersonalPage;
