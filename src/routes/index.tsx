import StoryPage from "pages/story";
import { BrowserRouter, Switch } from "react-router-dom";
import AuthPage from "../pages/auth";
import HomePage from "../pages/home";
import PersonalPage from "../pages/personal";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/auth" component={AuthPage} />
        <PrivateRoute exact path="/personal/:user" component={PersonalPage} />
        <PrivateRoute exact path="/home" component={HomePage} />
        <PrivateRoute exact path="/story/:storyId" component={StoryPage} />
        <PrivateRoute component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default RoutesComponent;
