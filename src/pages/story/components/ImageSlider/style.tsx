import { makeStyles } from "@mui/styles";

const useImageSliderStyles = makeStyles({
  imageSurface: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#303030",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    color: "white",
    height: "50vh",
  },
  taskBar: {
    width: "30",
    height: "50px",
    position: "absolute",
    display: "flex",
  },
  logo: {
    marginLeft: "20px",
  },
  back: {
    color: "white",
    marginTop: "0",
  },
});

export default useImageSliderStyles;
