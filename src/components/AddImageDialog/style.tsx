import { makeStyles } from "@mui/styles";

const useAddImageDialogStyles = makeStyles({
  fileButton: {
    width: "100%",
    marginTop: "20px",
    height: "40px",
  },
  fileName: {
    height: "40px",
    lineHeight: "40px",
  },
  selectType: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default useAddImageDialogStyles;
