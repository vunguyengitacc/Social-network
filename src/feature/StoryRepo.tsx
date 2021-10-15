import { Route, Switch } from "react-router";
import UserRepository from "../pages/UserRepo";

const StoryRepositoryFeature = () => {
  return (
    <Switch>
      <Route exact path={"/:user"} component={UserRepository} />
    </Switch>
  );
};

export default StoryRepositoryFeature;
