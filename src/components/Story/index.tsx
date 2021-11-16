import {
  Button,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Divider,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useState } from "react";
import dateUtil from "utillity/date";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { reactToStory, removeStory, update } from "reduxSlice/storySlice";
import LockIcon from "@mui/icons-material/Lock";
import { IUser } from "models/user";
import { useHistory } from "react-router";
import useStoryStyles, { Puller, Wrapper } from "./style";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import ImageRender from "components/ImageRender";
import CommentIcon from "@mui/icons-material/Comment";
import CommentBox from "components/CommentBox";
import theme from "app/theme";
import { Editor, EditorState, convertFromRaw } from "draft-js";

interface IPropsStory {
  _id: string;
  createdAt: Date;
  imageUrl: string[];
  content: string;
  isPrivate: boolean;
  owner: IUser | undefined;
  likeById: string[];
  dislikeById: string[];
}

const Story: React.FC<IPropsStory> = (props) => {
  const { _id, createdAt, content, isPrivate, owner, likeById, dislikeById } =
    props;
  const history = useHistory();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(Boolean(anchor));
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [richContent] = useState<EditorState>(
    EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
  );

  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  let islike = likeById.filter((i) => i === me._id).length > 0;
  let isDislike = dislikeById.filter((i) => i === me._id).length > 0;
  let isMe = owner?._id !== me._id ? false : true;
  const mdMatch = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useDispatch<AppDispatch>();

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchor(null);
    setOpenMenu(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(null);
    setOpenMenu(false);
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
    setOpenMenu(false);
    const toastId = toast.loading("Loading");
    try {
      dispatch(update({ _id, isPrivate: !isPrivate })).then(unwrapResult);
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
      <Menu open={openMenu} anchorEl={anchor} onClose={handleClose}>
        <Box className={style.menuSurface}>
          <Button
            sx={{ display: "flex", justifyContent: "flex-start" }}
            startIcon={<VerifiedUserIcon />}
            color="primary"
            onClick={handleTogglePrivate}
          >
            {isPrivate === true ? "Set to public" : "Set to private"}
          </Button>
          <Button
            sx={{ display: "flex", justifyContent: "flex-start" }}
            startIcon={<DeleteForeverIcon />}
            color="error"
            onClick={handleDelete}
          >
            Delete this story
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
          <Box>
            <Typography variant="bold4">{owner?.fullname}</Typography>
            <Typography variant="subtitle2">
              {dateUtil.getDateMeaning(createdAt)}
            </Typography>
          </Box>
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
        <Editor readOnly editorState={richContent} onChange={() => {}} />
      </Box>
      {props.imageUrl.length > 0 && (
        <Box
          className={style.imageSurface}
          component="div"
          onClick={() => history.push(`/story/${props._id}`)}
        >
          <ImageRender value={props.imageUrl} />
        </Box>
      )}

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
        <Button
          className={style.commentBtn}
          onClick={() => setOpenComment(!openComment)}
          {...{ color: `${openComment ? "primary" : "disable"}` }}
        >
          <CommentIcon />
          {mdMatch && <Typography>Comment</Typography>}
        </Button>
      </Box>
      {mdMatch && openComment && (
        <>
          <Divider />
          <CommentBox storyId={_id} />
        </>
      )}
      {!mdMatch && (
        <SwipeableDrawer
          anchor="bottom"
          open={openComment}
          onOpen={() => setOpenComment(true)}
          onClose={() => setOpenComment(false)}
          sx={{
            borderTopLeftRadius: "20px",
          }}
        >
          <>
            <Puller />
            <CommentBox storyId={_id} />
          </>
        </SwipeableDrawer>
      )}
    </Wrapper>
  );
};

export default Story;
