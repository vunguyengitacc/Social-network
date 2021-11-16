import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton } from "@mui/material";
import InputTextField from "components/InputField/InputTextField";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormComment, scheme } from "./form";
import useSendCommentFormStyles from "./style";
import SendIcon from "@mui/icons-material/Send";
import commentApi from "api/commentApi";

interface IProps {
  storyId: string;
  reload: () => void;
}

const SendCommentForm: React.FC<IProps> = (props) => {
  const style = useSendCommentFormStyles();
  const form = useForm<IFormComment>({
    mode: "onSubmit",
    defaultValues: {
      content: "",
    },
    resolver: yupResolver(scheme),
  });

  const sendComment: SubmitHandler<IFormComment> = async (data) => {
    try {
      await commentApi.create({
        content: data.content,
        storyId: props.storyId,
      });
      form.reset();
      props.reload();
    } catch (error) {}
  };

  return (
    <form className={style.surface} onSubmit={form.handleSubmit(sendComment)}>
      <InputTextField
        form={form}
        name="content"
        sxInput={{
          borderRadius: "20px",
        }}
        sxWrap={{
          paddingRight: "2.5%",
        }}
        placeholder="type your comment here"
      />
      <IconButton type="submit" className={style.sendBtn}>
        <SendIcon />
      </IconButton>
    </form>
  );
};

export default SendCommentForm;
