import { makeStyles } from "@mui/styles";

const useImageRenderStyles = makeStyles({
  otherImage: {
    width: "auto",
    height: "121px",
    backgroundSize: "125px",
    backgroundColor: "#616161 !important",
    opacity: "0.6",
    color: "black",
    "&:hover": {
      backgroundColor: "#616161 !important",
    },
  },
});

export default useImageRenderStyles;
