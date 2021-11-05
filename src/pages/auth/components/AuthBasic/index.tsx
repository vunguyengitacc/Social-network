import { Button, Typography, Hidden } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { login, register } from "reduxSlice/authSlice";
import LoginForm, { ILoginFormValues } from "../Login";
import RegisterForm, { IRegisterFormValues } from "../Register";
import useAuthBasicStyles from "./style";
import logo from "images/Logo.png";
import theme from "app/theme";

const AuthBasic = () => {
  const style = useAuthBasicStyles(theme);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const submitRegister = (data: IRegisterFormValues) => {
    dispatch(register(data));
  };
  const submitLogin = (data: ILoginFormValues) => {
    dispatch(login(data));
  };

  return (
    <Box className={style.surface}>
      <Hidden mdDown>
        <Box className={style.itemSurface}>
          <img src={logo} alt="" />
        </Box>
      </Hidden>
      <Box className={style.itemSurface}>
        <Box className={style.authForm}>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h4" className={style.formTitle}>
              {isLogin ? `LOGIN` : `REGISTER`}
            </Typography>
          </Box>
          <Box>
            {isLogin ? (
              <LoginForm onSubmit={submitLogin} />
            ) : (
              <RegisterForm onSubmit={submitRegister} />
            )}
          </Box>
          <Box className={style.switchField}>
            {isLogin ? (
              <Button className={style.fullWidthButton} onClick={toggleLogin}>
                Dont have an account?
              </Button>
            ) : (
              <Button className={style.fullWidthButton} onClick={toggleLogin}>
                Already have an account?
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthBasic;
