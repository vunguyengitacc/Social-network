import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Taskbar from "./TaskBar/TaskBar";
import SearchIcon from "@mui/icons-material/Search";
import SearchField from "./SearchField/SearchField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setShowSearch } from "../../reduxSlice/UISlice";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isShowSearch = useSelector((state: RootState) => state.ui.isShowSearch);

  const toggleSearchField = () => {
    dispatch(setShowSearch(!isShowSearch));
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: "3vh",
        marginTop: "0",
        height: "5vh",
      }}
    >
      <Box
        sx={{
          marginTop: "0",
          backgroundColor: "transparent",
          width: "100%",
          height: "100%",
          marginBottom: "30px",
          display: "flex",
        }}
      >
        <IconButton onClick={toggleSearchField} sx={{ width: "10%" }}>
          <SearchIcon />
        </IconButton>
        {isShowSearch && (
          <Box sx={{ width: "90%" }}>
            <SearchField />
          </Box>
        )}
      </Box>
      <Taskbar />
    </Box>
  );
};

export default Sidebar;
