import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { IUser } from "models/user";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { debounce, truncate } from "lodash";
import userApi from "api/userApi";
import useSearchBarStyles from "./style";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState<IUser[]>([]);

  const style = useSearchBarStyles();
  const history = useHistory();

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
    <>
      <Box display="flex" width="100%" alignItems="center" gap="10px">
        <SearchIcon />
        <Typography sx={{ height: "40px" }}>Search</Typography>
      </Box>
      <TextField
        placeholder="type something here"
        fullWidth
        onChange={submitSearch}
      />
      <List className={style.searchField}>
        {searchResult.map((item) => (
          <ListItem key={item._id}>
            <Button
              className={style.searchItem}
              onClick={() => history.push(`/personal/${item._id}`)}
            >
              <Avatar alt="" src={item.avatarUri} />
              <Typography>{truncate(item.fullname, { length: 30 })}</Typography>
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchBar;
