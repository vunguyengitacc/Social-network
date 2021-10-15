import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Taskbar from "./TaskBar/TaskBar";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import SearchField from "./SearchField/SearchField";

const Sidebar = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const toggleSearchField = () => {
    setOpenSearch(!openSearch);
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
        {openSearch && (
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
