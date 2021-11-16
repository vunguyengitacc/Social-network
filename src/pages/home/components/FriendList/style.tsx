import { makeStyles } from "@mui/styles";

const friendListStyle = makeStyles({
  surface: {
    width: "100%",
    position: "sticky",
    top: "60px",
    marginTop: "0",
    backgroundColor: "#fff",
    borderRadius: "5px",
    paddingBottom: "10px",
    border: "1px solid #e8e8e8",
    maxHeight: "90vh",
  },
  title: {
    padding: "10px",
    color: "gray",
  },
  listUser: {
    maxHeight: "85vh",
    overflow: "hidden",
    overflowY: "scroll",
  },
  defaultCard: {
    backgroundColor: "#e5e5e5",
    padding: "10px",
    borderRadius: "10px",
    display: "flex",
    margin: "10px",
    justifyContent: "center",
    marginTop: "20px",
  },
});

export default friendListStyle;
