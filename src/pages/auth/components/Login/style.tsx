import { makeStyles } from "@mui/styles";

const useLoginStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "80%",
    marginLeft: "10%",
  },
  label: {
    textAlign: "left",
  },
  submitButton: {
    height: "50px",
    marginTop: "40px !important",
    marginBottom: "30px !important",
    backgroundColor: "#979d9d !important",
    color: "white !important",
  },
  facebookAuth: {
    height: "50px",
    marginBottom: "30px !important",
    color: " white !important",
    backgroundColor: "#1877f2 !important",
  },
});

export default useLoginStyles;
