import { Route, Switch, useRouteMatch } from "react-router";
import AuthBasic from "./components/AuthBasic";
import OAuth from "./components/OAuth";

const AuthPage = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={AuthBasic} />
      <Route path={`${match.url}/oauth/:access_token`} component={OAuth} />
    </Switch>
  );
};

export default AuthPage;
