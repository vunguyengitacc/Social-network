import { makeStyles } from "@mui/styles";

const useStoryContentStyles = makeStyles({
  surface: {
    width: "100%",
    height: "100vh",
    padding: "10px",
    boxSizing: "border-box",
  },
  avatar: {
    width: "50px",
    height: "50px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  userInfor: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  storyMsg: { margin: "20px 0 20px 0", textAlign: "left" },
});

export default useStoryContentStyles;
