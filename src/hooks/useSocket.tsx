import { socketClient } from "app/socket";
import { AppDispatch, RootState } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMeHard } from "reduxSlice/authSlice";
import { updateStory } from "reduxSlice/storySlice";

export default function useSocket() {
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    socketClient.emit("connection");
    return () => {
      socketClient.emit("disconnection");
    };
  });

  useEffect(() => {
    socketClient.on("friend/delete", (data) => {
      if (data.user._id === me._id) dispatch(updateMeHard(data.user));
      else if (data.to._id === me._id) dispatch(updateMeHard(data.to));
    });
    socketClient.on("friend/request/add", (data) => {
      if (data.user._id === me._id) dispatch(updateMeHard(data.user));
      else if (data.to._id === me._id) dispatch(updateMeHard(data.to));
    });
    socketClient.on("image/uploaded", (data) => {
      dispatch(updateStory(data.story));
      console.log("upload");
    });
    socketClient.on("friend/request/deny", (data) => {
      if (data.user._id === me._id) dispatch(updateMeHard(data.user));
      else if (data.to._id === me._id) dispatch(updateMeHard(data.to));
    });
    socketClient.on("friend/request/accept", (data) => {
      if (data.user._id === me._id) dispatch(updateMeHard(data.user));
      else if (data.to._id === me._id) dispatch(updateMeHard(data.to));
    });
  });

  return {};
}
