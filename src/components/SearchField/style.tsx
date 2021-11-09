import { makeStyles } from "@mui/styles";

const useSearchFieldStyles = makeStyles({
  searchField: {
    height: "50px",
    width: "400px",
    display: "flex",
    alignItems: "center",
  },
  withEffect: {
    animation: "$effect 1s",
  },
  "@keyframes effect": {
    "0%": {
      width: "0px",
    },
    "100%": {
      width: "400px",
    },
  },
  searchItem: {
    zIndex: 99,
    display: "flex",
    height: "6vh !important",
    width: "100%",
    justifyContent: "left !important",
    borderRadius: "0 !important",
    backgroundColor: "rgba(30, 30, 30, 0.8) !important",
    color: "white !important",
    "&:hover": {
      backgroundColor: "gray !important",
    },
  },
  searchAvatar: {
    height: "4vh",
    padding: "1vh",
  },
  fullname: {
    height: "4vh",
    lineHeight: "4vh",
    textAlign: "start",
    display: "flex",
    justifyContent: "left-start",
  },
});

export default useSearchFieldStyles;
