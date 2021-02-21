import React from "react";
import { useState } from "react";
import UserImage from '../UserImage';
import { useSelector } from "react-redux";
import "./CommentForm.css";
import {createCommentDispatcher} from "./CommentFormUtils";

const CommentForm = ({ round, comments, setComments }) => {

  const {user} = useSelector(state => state.session);

  const [comment, setComment] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const newCommentData = {
      userId: user.id,
      body: comment,
      roundId: round.id
    };
    createCommentDispatcher(round, newCommentData, comments, setComments);
    setComment("");
  };

  return (
    <div className="comment-form_wrapper">
    <form className="comment-form" onSubmit={onSubmit}>
        <UserImage user={user} />
        <textarea value={comment} onChange={e => setComment(e.target.value)} className="input-field"/>
      <button type="submit" className="submit-button">Send</button>
    </form>
  </div>
  )
};

export default CommentForm;