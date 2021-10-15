import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "../app/store";

interface AuthRouteProps extends RouteProps {
  component: any;
  layout?: any;
}
const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return isAuth ? (
    <Redirect to="/stories/me" />
  ) : (
    <Route {...rest} render={(props) => <Component {...props} />} />
  );
};

export default AuthRoute;
