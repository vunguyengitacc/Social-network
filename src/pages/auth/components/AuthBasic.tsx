import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { login, register } from "../../../reduxSlice/authSlice";
import LoginForm, { ILoginFormValues } from "./Login";
import RegisterForm, { IRegisterFormValues } from "./Register";

const useStyle = makeStyles({
  authForm: {
    marginTop: "15vh",
    width: "40%",
    minHeight: "50px",
    borderRadius: "20px",
    marginLeft: "30%",
    backgroundColor: "#F1EDED",
    boxShadow:
      "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
  },
  formTitle: {
    paddingTop: "30px",
    paddingBottom: "10px",
  },
  switchField: {
    height: "50px",
    width: "100%",
    display: "flex",
  },
  fullWidthButton: {
    width: "100%",
  },
});

const AuthBasic = () => {
  const style = useStyle();
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
    <Box sx={{ maxHeight: "100vh" }}>
      <Box className={style.authForm}>
        <Box>
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
  );
};

export default AuthBasic;
