import { Route, Switch, useRouteMatch } from "react-router";
import Auth from "./components/Auth";
import OAuth from "./components/OAuth";
const AuthPage = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={Auth} />
      <Route path={`${match.url}/oauth/:access_token`} component={OAuth} />
    </Switch>
  );
};

export default AuthPage;
