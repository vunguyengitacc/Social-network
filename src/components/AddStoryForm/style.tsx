import { makeStyles } from "@mui/styles";

const useAddStoryFormStyles = makeStyles({
  surface: {
    backgroundColor: "white",
    border: "1px solid #e8e8e8",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  contentSurface: {
    display: "flex",
    alignItems: "center",
    height: "75px",
    padding: "0 2% 0 2%",
    gap: "2%",
  },
  avatar: {},
  inputFile: {
    display: "flex",
    padding: "0px 2% 0px 2%",
    flexDirection: "row",
    margin: "10px 2% 10px 2%",
    backgroundColor: "#efefef",
    borderRadius: "5px",
    justifyContent: "space-between",
    gap: "20px",
  },
  inputFileValue: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
  },
  button: {
    maxWidth: "40px",
  },
  smallBtn: {
    maxWidth: "20px !important",
  },
});

export default useAddStoryFormStyles;
