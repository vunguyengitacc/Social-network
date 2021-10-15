import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Redirect, RouteProps, Route } from "react-router-dom";
import React from "react";

interface IPublicRoute extends RouteProps {
  component: any;
  layout?: any;
}

const PublicRoute: React.FC<IPublicRoute> = ({
  component: Component,
  layout,
  ...rest
}) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};
export default PublicRoute;
