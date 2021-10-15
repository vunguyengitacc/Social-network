import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { AppDispatch } from "../app/store";
import { getMe } from "../reduxSlice/authSlice";
export interface IParamsOAuth {
  access_token: string;
}
const OAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { access_token } = useParams<IParamsOAuth>();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("access_token", access_token);
    dispatch(getMe());
    history.push("/stories/me");
    //eslint-disable-next-line
  }, [access_token]);

  return <div>Open Authentication Page</div>;
};

export default OAuth;
