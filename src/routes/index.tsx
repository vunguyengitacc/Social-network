import { BrowserRouter, Switch } from "react-router-dom";
import AuthFeature from "../feature/Auth";
import StoryRepositoryFeature from "../feature/StoryRepo";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

const RoutesComponent = () => (
  <BrowserRouter>
    <Switch>
      <AuthRoute path="/auth" component={AuthFeature} />
      <PrivateRoute path="/" component={StoryRepositoryFeature} />
    </Switch>
  </BrowserRouter>
);

export default RoutesComponent;
