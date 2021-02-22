import React from "react";
import { useState } from "react";
import UserImage from '../UserImage';
import { useSelector } from "react-redux";
import "./CommentForm.css";
import { IoSend } from "react-icons/all"
import {createCommentDispatcher} from "./CommentFormUtils";

const CommentForm = ({ body, round, comments, setComments }) => {

  const {user} = useSelector(state => state.session);

  const [newComment, setNewComment] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newComment){
      const newCommentData = {
        userId: user.id,
        body: newComment,
        roundId: round.id
      };
      createCommentDispatcher(round, newCommentData, comments, setComments);
      setNewComment("");
    }
  };

  if (body) setNewComment(body);

  return (
    <div className="comment-form_wrapper">
    <form className="comment-form" onSubmit={onSubmit}>
        <UserImage user={user} />
        <textarea id="comment-form-input" value={newComment} onChange={e => setNewComment(e.target.value)} className="input-field"/>
      <button type="submit" id="comment-form-submit-button"><IoSend id="send-icon"/></button>
    </form>
  </div>
  )
};

export default CommentForm;