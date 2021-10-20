import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import userApi from "../../../api/userApi";
import { IUser } from "../../../models/user";
import _, { debounce } from "lodash";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setShowSearch } from "../../../reduxSlice/UISlice";

const useStyles = makeStyles({
  input: {
    backgroundColor: "rgba(255,255,255, 0.1)",
    border: "none",
    outline: "none",
    height: "80%",
    fontSize: "15px",
    animation: "$effect 1s",
    borderRadius: "0 30px 30px 0",
    width: "95%",
    float: "left",
  },
  "@keyframes effect": {
    "0%": {
      transform: "translateX(-200%)",
    },
    "100%": {
      transform: "translateX(0)",
    },
  },
  searchResult: {
    width: "95%",
    height: "90%",
    position: "relative",
  },
  searchAvatar: {
    height: "4vh",
    padding: "1vh",
  },
  searchTitle: {
    height: "4vh",
    lineHeight: "4vh",
    textAlign: "start",
    display: "flex !important",
    justifyContent: "left-start",
  },
  searchItem: {
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
});

const SearchField = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchResult, setSearchResult] = useState<IUser[]>([]);
  const history = useHistory();
  const style = useStyles();

  const searchHandle = (term: string) => {
    (async () => {
      const response = await userApi.search(term);
      setSearchResult(response.data.users);
    })();
  };

  const debounceCall = debounce((term) => searchHandle(term), 1000);

  const submitSearch = (e: React.FormEvent<HTMLInputElement>) => {
    let term = e.currentTarget.value;
    debounceCall(term);
  };

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <Box sx={{ overflow: "hidden", width: "100%", height: "100%" }}>
        <input className={style.input} onChange={submitSearch} />
      </Box>
      <Box
        className={style.searchResult}
        component="div"
        onBlur={() => dispatch(setShowSearch(false))}
      >
        {searchResult.map((item) => (
          <Button
            key={item._id}
            className={style.searchItem}
            onClick={() => history.push(`/${item._id}`)}
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
              {_.truncate(item.fullname, { length: 15 })}
            </Typography>
          </Button>
        ))}
      </Box>
    </div>
  );
};

export default SearchField;
