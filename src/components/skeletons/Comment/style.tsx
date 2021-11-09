import { makeStyles } from "@mui/styles";

const useCommentSkeletonStyles = makeStyles({
  surface: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "10px",
  },
  avatar: {},
  content: {
    maxWidth: "70%",
  },
});

export default useCommentSkeletonStyles;
