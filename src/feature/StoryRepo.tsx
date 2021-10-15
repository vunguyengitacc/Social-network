import { Route, Switch, useRouteMatch } from "react-router";
import UserRepository from "../pages/UserRepo";

const StoryRepositoryFeature = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/:user`} component={UserRepository} />
    </Switch>
  );
};

export default StoryRepositoryFeature;
