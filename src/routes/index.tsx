import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import AuthPage from "../pages/auth";
import HomePage from "../pages/home";
import PersonalPage from "../pages/personal";
import { closeAlert } from "../reduxSlice/UISlice";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

const RoutesComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const alert = useSelector((state: RootState) => state.ui.alert);

  return (
    <BrowserRouter>
      {alert.type !== "info" && (
        <Snackbar
          open={alert.isShow}
          autoHideDuration={500}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            position: "fixed",
            margin: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
          onClose={() => dispatch(closeAlert())}
        >
          <Alert
            variant="filled"
            severity={alert.type}
            sx={{
              marginRight: "20px",
            }}
          >
            <AlertTitle sx={{ display: "flex" }}>{alert.type}</AlertTitle>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
      <Switch>
        <AuthRoute path="/auth" component={AuthPage} />
        <PrivateRoute path="/personal/:user" component={PersonalPage} />
        <PrivateRoute exact path="/home" component={HomePage} />
        <PrivateRoute component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default RoutesComponent;
