import React, {useEffect} from "react";
import { useState } from "react";
import UserImage from '../UserImage';
import { useSelector } from "react-redux";
import "./CommentForm.css";
import { IoSend } from "react-icons/all"
import { createCommentDispatcher, editCommentDispatcher } from "./CommentFormUtils";

const CommentForm = ({ 
  round, 
  comments, 
  setComments,
  commentDisplayed,
  setCommentDisplayed,
  editing,
  setEditing
  }) => {

  const {user} = useSelector(state => state.session);

  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if(commentDisplayed){
      setNewComment(commentDisplayed.body)
    }
  },[commentDisplayed]) 

  let editedComment;
  const onSubmit = async (e) => {
    e.preventDefault();
    if (newComment && !commentDisplayed){
      const newCommentData = {
        userId: user.id,
        body: newComment,
        roundId: round.id
      };
      createCommentDispatcher(round, newCommentData, comments, setComments);
      setNewComment('');
    }else if (newComment && commentDisplayed){
      const newCommentData = {
        body: newComment
      };
      editedComment = await editCommentDispatcher(
        round.id, 
        commentDisplayed.id, 
        newCommentData, 
        comments, 
        setComments
        );
      setEditing(false);
      setCommentDisplayed(editedComment);
    }
  };

  return (
    <div className="comment-form_wrapper">
      <form className="comment-form" onSubmit={onSubmit}>
        <UserImage user={user} />
        <div id="comment-form-editing">
        <textarea 
          id="comment-form-input" 
          value={newComment} 
          onChange={e => setNewComment(e.target.value)} 
          className="input-field"
        />
        <button hidden={!editing} id="comment-form-cancel-button" onClick={()=>setEditing(false)}>cancel</button>
        </div>
      <button type="submit" id="comment-form-submit-button"><IoSend id="send-icon"/></button>
    </form>
  </div>
  )
};

export default CommentForm;