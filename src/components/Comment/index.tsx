import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { IComment } from "models/comment";
import React, { useState } from "react";
import useCommentStyles from "./style";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import commentApi from "api/commentApi";
import toast from "react-hot-toast";

interface IProps {
  value: IComment;
}

const Comment: React.FC<IProps> = (props) => {
  const { value } = props;
  const style = useCommentStyles();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [anchorMenu, setAnchorMenu] = useState<HTMLElement | undefined>(
    undefined
  );
  const me = useSelector((state: RootState) => state.auth.currentUser);

  const setOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorMenu(e.currentTarget);
    setIsOpenMenu(true);
  };

  const setCloseMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorMenu(undefined);
    setIsOpenMenu(false);
    setIsHover(false);
  };

  const deleteComment = async () => {
    const toastId = toast.loading("Loading");
    try {
      await commentApi.deleteById(value._id);
      toast.success("Success", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <Box
      className={style.surface}
      component="div"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setAnchorMenu(undefined);
        setIsOpenMenu(false);
      }}
    >
      {isOpenMenu && (
        <Menu open={isOpenMenu} anchorEl={anchorMenu} onClose={setCloseMenu}>
          {me._id === value.owner._id && (
            <MenuItem key={`delete-${value._id}`} onClick={deleteComment}>
              <Typography> Delete</Typography>
              <DeleteIcon />
            </MenuItem>
          )}
        </Menu>
      )}
      <Avatar src={value.owner.avatarUri} />
      <Typography className={style.content}>{value.content}</Typography>
      {isHover && (
        <IconButton onClick={setOpenMenu}>
          <MoreHorizIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Comment;
