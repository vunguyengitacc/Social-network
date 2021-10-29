import { Button, IconButton, Typography, Menu, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useState } from "react";
import dateUtil from "../../utillity/dateUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { reactToStory, removeStory, update } from "../../reduxSlice/storySlice";
import LockIcon from "@mui/icons-material/Lock";
import { IUser } from "../../models/user";
import { useHistory } from "react-router";

const Wrapper = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  minHeight: "100px",
  borderRadius: "10px",
  [theme.breakpoints.down("md")]: {
    marginBottom: "30px",
  },
  [theme.breakpoints.up("md")]: {
    marginBottom: "50px",
  },
  boxShadow:
    "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
}));

const useStyle = makeStyles({
  taskBtn: {
    float: "right",
  },
  titleField: {
    marginLeft: "2.5%",
    marginRight: "2.5%",
    paddingTop: "20px",
  },
  image: {
    maxWidth: "100%",
    minWidth: "50%",
  },
  groupTask: {
    marginTop: "20px",
  },
  feelingBtn: {
    width: "50%",
    height: "50px",
  },
});

interface IPropsStory {
  _id: string;
  createdAt: Date;
  imageUrl: string;
  content: string;
  isPrivate: boolean;
  owner: IUser | undefined;
  isMe: boolean;
  likeById: string[];
  dislikeById: string[];
}

const Story: React.FC<IPropsStory> = (props) => {
  const {
    _id,
    createdAt,
    imageUrl,
    content,
    isPrivate,
    owner,
    isMe,
    likeById,
    dislikeById,
  } = props;
  const history = useHistory();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(Boolean(anchor));
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  let islike = likeById.filter((i) => i === me._id).length > 0;
  let isDislike = dislikeById.filter((i) => i === me._id).length > 0;

  const dispatch = useDispatch<AppDispatch>();

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchor(null);
    setOpen(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(null);
    setOpen(false);
    dispatch(removeStory(_id));
  };

  const handleTogglePrivate = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(null);
    setOpen(false);
    dispatch(update({ _id, isPrivate: !isPrivate, url: imageUrl }));
  };

  const style = useStyle();

  const handleToogleLike = () => {
    dispatch(reactToStory({ like: !islike, storyId: _id }));
  };

  const handleToggleDislike = () => {
    dispatch(reactToStory({ storyId: _id, dislike: !isDislike }));
  };

  return (
    <Wrapper>
      <Box>
        <Box>
          <Menu open={open} anchorEl={anchor} onClose={handleClose}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "200px",
              }}
            >
              <Button
                sx={{ display: "flex", justifyContent: "flex-start" }}
                startIcon={<DeleteForeverIcon />}
                color="error"
                onClick={handleDelete}
              >
                Delete this story
              </Button>
              <Button
                sx={{ display: "flex", justifyContent: "flex-start" }}
                startIcon={<VerifiedUserIcon />}
                color="primary"
                onClick={handleTogglePrivate}
              >
                {isPrivate === true ? "Set to public" : "Set to privite"}
              </Button>
            </Box>
          </Menu>
          <Box
            className={style.titleField}
            sx={{
              display: "flex",
              height: "40px",
              marginBottom: "20px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={owner?.avatarUri}
                sx={{
                  marginRight: "20px",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => history.push(`/personal/${owner?._id}`)}
              />
              <Typography
                sx={{
                  display: "flex",
                  lineHeight: "40px",
                  backgroundImage: "linear-gradient(#89f7fe, #66a6ff)",
                  fontWeight: "bolder",
                  textAlign: "center",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  borderRadius: "20px",
                  marginRight: "20px",
                }}
              >
                {dateUtil.getFullDate(createdAt)}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  lineHeight: "40px",
                  backgroundImage: "linear-gradient(#D38312, #A83279)",
                  fontWeight: "bolder",
                  textAlign: "center",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  borderRadius: "20px",
                }}
              >
                {dateUtil.getFullHours(createdAt)}
              </Typography>
              {isPrivate && (
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "30px",
                  }}
                >
                  <LockIcon />
                </Typography>
              )}
            </Box>
            {isMe && (
              <IconButton onClick={handleOpenMenu} className={style.taskBtn}>
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: "flex", margin: "0 2.5% 2.5% 2.5% " }}>
            {content}
          </Box>
          <Box
            sx={{
              width: "100%  ",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgb(239 233 233)",
            }}
          >
            <img
              alt="Internet error"
              className={style.image}
              src={imageUrl}
            ></img>
          </Box>
          <Box className={style.groupTask}>
            <Button
              className={style.feelingBtn}
              sx={{
                color: `${islike ? "#667eea" : "gray"}`,
              }}
              onClick={handleToogleLike}
            >
              <ThumbUpAltIcon /> {likeById.length || ""}
            </Button>
            <Button
              className={style.feelingBtn}
              sx={{
                color: `${isDislike ? "#667eea" : "gray"}`,
              }}
              onClick={handleToggleDislike}
            >
              <ThumbDownAltIcon /> {dislikeById.length || ""}
            </Button>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Story;
