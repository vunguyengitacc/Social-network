import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import userApi from "../../api/userApi";
import { IUser } from "../../models/user";
import _, { debounce } from "lodash";
import { useHistory } from "react-router";
import useSearchFieldStyles from "./style";

const SearchField = () => {
  const [searchResult, setSearchResult] = useState<IUser[]>([]);

  const history = useHistory();
  const style = useSearchFieldStyles();

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
      display="flex"
      flexDirection="column"
      className={style.searchField}
      justifyContent="center"
      component="div"
    >
      <TextField
        fullWidth
        onChange={submitSearch}
        placeholder="Please type something"
      />
      {searchResult.map((item) => (
        <Button
          key={item._id}
          className={style.searchItem}
          onClick={() => history.push(`/personal/${item._id}`)}
        >
          <img alt="" src={item.avatarUri} className={style.searchAvatar} />
          <Typography className={style.fullname}>
            {_.truncate(item.fullname, { length: 30 })}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default SearchField;
