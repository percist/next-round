import React from "react";
import { useState } from "react";
import UserImage from '../UserImage';
import { useSelector } from "react-redux";
import "./CommentForm.css";
import { IoSend } from "react-icons/all"
import { createCommentDispatcher, editCommentDispatcher } from "./CommentFormUtils";
import { fetchRoundComments } from "../RoundsCard/RoundsCardUtils";

const CommentForm = ({ 
  comment, 
  round, 
  comments, 
  setComments,
  setCommentDisplayed,
  setEditing
  }) => {

  const {user} = useSelector(state => state.session);

  const [newComment, setNewComment] = useState('');

  let editedComment;
  const onSubmit = async (e) => {
    e.preventDefault();
    if (newComment && !comment){
      const newCommentData = {
        userId: user.id,
        body: newComment,
        roundId: round.id
      };
      createCommentDispatcher(round, newCommentData, comments, setComments);
      setNewComment("");
    }else if (newComment && comment){
      const newCommentData = {
        body: newComment
      };
      editedComment = await editCommentDispatcher(
        round.id, 
        comment.id, 
        newCommentData, 
        comments, 
        setComments
        );
      setEditing(false);
      setCommentDisplayed(editedComment);
      console.log(editedComment)
      // setCommentDisplayed(editedComment);
    }
  };

  if (!newComment && comment) setNewComment(comment.body);

  return (
    <div className="comment-form_wrapper">
    <form className="comment-form" onSubmit={onSubmit}>
        <UserImage user={user} />
        <textarea 
          id="comment-form-input" 
          value={editedComment ? editedComment : newComment} 
          onChange={e => setNewComment(e.target.value)} 
          className="input-field"
        />
      <button type="submit" id="comment-form-submit-button"><IoSend id="send-icon"/></button>
    </form>
  </div>
  )
};

export default CommentForm;