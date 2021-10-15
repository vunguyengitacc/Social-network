import { Hidden } from "@mui/material";
import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar/Sidebar";
import StoryList from "../components/StoriesList/StoryList";

const UserRepository = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Hidden smDown>
        <Box
          sx={{
            width: "80vw",
            paddingLeft: "10vw",
            display: "flex",
          }}
        >
          <Box sx={{ width: "30%", paddingTop: "3vh" }}>
            <Sidebar />
          </Box>
          <Box sx={{ marginLeft: "5%", width: "65%", paddingTop: "3vh" }}>
            <StoryList />
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};

export default UserRepository;
