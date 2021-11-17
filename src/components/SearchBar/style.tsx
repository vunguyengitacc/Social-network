import { makeStyles } from "@mui/styles";

const useSearchBarStyles = makeStyles({
  searchField: {
    marginTop: "10px !important",
    width: "75vw",
    overflow: "hidden",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    direction: "rtl",
  },
  searchItem: {
    direction: "ltr",
    zIndex: 99,
    display: "flex",
    gap: "12px",
    padding: "10px 0 10px 0 !important",
    justifyContent: "flex-start !important",
    width: "100%",
  },
  fullname: {
    height: "4vh",
    lineHeight: "4vh",
    textAlign: "start",
    display: "flex",
    justifyContent: "left-start",
  },
});

export default useSearchBarStyles;
