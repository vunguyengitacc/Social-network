import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import userApi from "../../api/userApi";
import { IUser } from "../../models/user";
import _, { debounce } from "lodash";
import { useHistory } from "react-router";

const useStyle = makeStyles({
  searchField: {
    height: "40px",
  },
  withEffect: {
    animation: "$effect 1s",
  },
  "@keyframes effect": {
    "0%": {
      width: "0px",
    },
    "100%": {
      width: "400px",
    },
  },
  searchItem: {
    zIndex: 99,
    display: "flex",
    height: "6vh !important",
    width: "100%",
    justifyContent: "left !important",
    borderRadius: "0 !important",
    backgroundColor: "rgba(30, 30, 30, 0.8) !important",
    color: "white !important",
    "&:hover": {
      backgroundColor: "gray !important",
    },
  },
  searchAvatar: {
    height: "4vh",
    padding: "1vh",
  },
});

const SearchField = () => {
  const [searchResult, setSearchResult] = useState<IUser[]>([]);

  const history = useHistory();
  const style = useStyle();

  const searchHandle = (term: string) => {
    (async () => {
      const response = await userApi.search(term);
      setSearchResult(response.data.users);
    })();
  };

  const debounceCall = debounce((term) => searchHandle(term), 1000);

  const submitSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let term = e.currentTarget.value;
    debounceCall(term);
  };

  return (
    <Box
      sx={{ width: "400px" }}
      className={`${style.withEffect} ${style.searchField}`}
      component="div"
    >
      <TextField fullWidth onChange={submitSearch} />
      {searchResult.map((item) => (
        <Button
          key={item._id}
          className={style.searchItem}
          onClick={() => history.push(`/personal/${item._id}`)}
        >
          <img alt="" src={item.avatarUri} className={style.searchAvatar} />
          <Typography
            sx={{
              height: "4vh",
              lineHeight: "4vh",
              textAlign: "start",
              display: "flex",
              justifyContent: "left-start",
            }}
          >
            {_.truncate(item.fullname, { length: 30 })}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default SearchField;
