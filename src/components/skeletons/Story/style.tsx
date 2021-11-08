import { makeStyles } from "@mui/styles";

const useStorySkeletonStyles = makeStyles({
  surface: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #e8e8e8",
    marginBottom: "30px",
  },
  avatar: {},
  content: { height: "100px" },
});

export default useStorySkeletonStyles;
