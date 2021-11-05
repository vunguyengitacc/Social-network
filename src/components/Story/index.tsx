import { Button, IconButton, Typography, Menu, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
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
import useStoryStyles, { Wrapper } from "./style";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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
    const toastId = toast.loading("Loading");
    try {
      dispatch(removeStory(_id)).then(unwrapResult);
      toast.success("Success", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const handleTogglePrivate = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(null);
    setOpen(false);
    const toastId = toast.loading("Loading");
    try {
      dispatch(update({ _id, isPrivate: !isPrivate, url: imageUrl })).then(
        unwrapResult
      );
      toast.success("success", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const style = useStoryStyles();

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
            <Box className={style.menuSurface}>
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
          <Box className={style.titleField}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={owner?.avatarUri}
                className={style.avatar}
                onClick={() => history.push(`/personal/${owner?._id}`)}
              />
              <Typography className={style.date} variant="bold4">
                {dateUtil.getFullDate(createdAt)}
              </Typography>
              <Typography className={style.time} variant="bold4">
                {dateUtil.getFullHours(createdAt)}
              </Typography>
              {isPrivate && (
                <Typography className={style.privateIcon}>
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
          <Box className={style.imageSurface}>
            <img alt="Internet error" className={style.image} src={imageUrl} />
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
                color: `${isDislike ? "#f32b2b" : "gray"}`,
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
