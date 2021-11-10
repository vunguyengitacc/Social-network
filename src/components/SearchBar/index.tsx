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
    <Box>
      <Typography sx={{ height: "40px" }}>Search</Typography>
      <TextField fullWidth onChange={submitSearch} />
      <List className={style.searchField}>
        {searchResult.map((item) => (
          <ListItem>
            <Button
              className={style.searchItem}
              key={item._id}
              onClick={() => history.push(`/personal/${item._id}`)}
            >
              <Avatar alt="" src={item.avatarUri} />
              <Typography>{truncate(item.fullname, { length: 30 })}</Typography>
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchBar;
