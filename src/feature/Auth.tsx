import { Route, Switch, useRouteMatch } from "react-router";
import AuthPage from "../pages/Auth";
import OAuth from "../pages/OAuth";
const AuthFeature = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={AuthPage} />
      <Route path={`${match.url}/oauth/:access_token`} component={OAuth} />
    </Switch>
  );
};

export default AuthFeature;
