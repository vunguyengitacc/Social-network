import {
  Button,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Divider,
  SwipeableDrawer,
  useMediaQuery,
  CircularProgress,
  Tooltip,
  Stack,
  AvatarGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useEffect, useState } from "react";
import dateUtil from "utillity/date";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { removeStory, update } from "reduxSlice/storySlice";
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
import Reaction from "components/Reaction";
import reactionApi from "api/reactionApi";
import { IGroup, IReaction } from "models/reaction";
import {
  getStaticByValue,
  getTextByValue,
  getTextColorByValue,
} from "utillity/reaction";
import { socketClient } from "app/socket";

interface IPropsStory {
  _id: string;
  createdAt: Date;
  imageUrl: string[];
  content: string;
  isPrivate: boolean;
  owner: IUser | undefined;
  includeImage?: boolean;
}

const Story: React.FC<IPropsStory> = (props) => {
  const { _id, createdAt, content, isPrivate, owner } = props;
  const history = useHistory();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(Boolean(anchor));
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [overall, setOverall] = useState<IGroup[]>([]);
  const [reaction, setReaction] = useState<IReaction | null>(null);
  const [richContent] = useState<EditorState>(
    EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
  );
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;

  useEffect(() => {
    socketClient.on("reaction/touch", (data) => {
      if (data.reaction.storyId !== _id || data.reaction.userId !== me._id)
        return;
      else setReaction(data.reaction);
    });
  });

  useEffect(() => {
    reactionApi.getOverall(_id).then((res) => {
      setOverall(res.data.reactions);
    });
    reactionApi.getMyReaction(_id).then((res) => {
      setReaction(res.data.reaction);
    });
  }, [_id]);

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

  const handleRemoveReaction = () => {
    if (reaction === null) {
      reactionApi
        .reactToStory({ storyId: _id, type: 1 })
        .then((res) => setReaction(res.data.reaction));
    } else {
      reactionApi.deleteOne(_id);
      setReaction(null);
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
      <Box display="flex" margin="0 2.5% 2.5% 2.5%" textAlign="left">
        <Editor readOnly editorState={richContent} onChange={() => {}} />
      </Box>
      {props.imageUrl.length === 0 && props.includeImage && (
        <CircularProgress />
      )}
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
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <AvatarGroup max={3}>
            {overall?.map((i) => (
              <Avatar
                key={i._id}
                sx={{ width: "25px", height: "25px" }}
                src={getStaticByValue(Number(i._id))}
              />
            ))}
          </AvatarGroup>
          <Typography variant="bold3">
            {overall?.map((item) => item.count).reduce((a, b) => a + b, 0)}{" "}
            reactions
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Tooltip arrow title={<Reaction storyId={_id} />}>
            <Button className={style.feelingBtn} onClick={handleRemoveReaction}>
              <img
                src={getStaticByValue(reaction?.reactType ?? 0)}
                alt=""
                height="35px"
              />
              <Typography
                variant="bold4"
                color={getTextColorByValue(reaction?.reactType ?? 0)}
              >
                {getTextByValue(reaction?.reactType ?? 0)}
              </Typography>
            </Button>
          </Tooltip>
          <Button
            className={style.commentBtn}
            onClick={() => setOpenComment(!openComment)}
            {...{ color: `${openComment ? "primary" : "disable"}` }}
          >
            <CommentIcon />
            {mdMatch && <Typography>Comment</Typography>}
          </Button>
        </Stack>
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
