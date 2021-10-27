import { makeStyles } from "@mui/styles";

export default makeStyles({
  withEffect: {
    animation: "$effect 1s",
  },
  effect: {
    "@keyframes effect": {
      "0%": {
        width: "0%",
      },
      "100%": {
        width: "100%",
      },
    },
  },
});
