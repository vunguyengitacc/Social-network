import { makeStyles } from "@mui/styles";

const useCommentStyles = makeStyles({
  surface: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "10px 0 10px 0",
  },
  content: {
    backgroundColor: "#f1f2f6",
    padding: "10px",
    borderRadius: "10px",
  },
});

export default useCommentStyles;
