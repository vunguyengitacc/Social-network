import {
  Avatar,
  Button,
  List,
  ListItem,
  Stack,
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
import logo from "images/Logo.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface IProps {
  onClose: () => void;
}

const SearchBar: React.FC<IProps> = ({ onClose }) => {
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
      <Stack
        height="50px"
        direction="row"
        justifyContent="space-between"
        width="100%"
      >
        <img src={logo} alt="" height="100%" />
        <Button sx={{ width: "40px" }} onClick={() => onClose()}>
          <ArrowBackIosIcon />
          <ArrowBackIosIcon />
          <ArrowBackIosIcon />
        </Button>
      </Stack>
      <TextField
        placeholder="type something here"
        fullWidth
        onChange={submitSearch}
        InputProps={{
          startAdornment: <SearchIcon sx={{ marginRight: "10px" }} />,
        }}
      />
      <List className={style.searchField}>
        {searchResult.map((item) => (
          <ListItem key={item._id}>
            <Button
              className={style.searchItem}
              onClick={() => history.push(`/personal/${item._id}`)}
            >
              <Avatar alt="" src={item.avatarUri} />
              <Typography color="gray">
                {truncate(item.fullname, { length: 30 })}
              </Typography>
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchBar;
