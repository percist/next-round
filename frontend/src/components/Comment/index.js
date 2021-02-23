import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentForm from '../CommentForm';
import UserImage from '../UserImage';
import {fetchUser, deleteCommentDispatcher, editCommentDispatcher} from './CommentUtils';

const Comment = ({round, comment, comments, setComments}) => {

  const sessionUser = useSelector(state => state.session.user);
  const [ user, setUser ] = useState({});
  const [ editing, setEditing ] = useState(false);
  const [ commentDisplayed, setCommentDisplayed ] = useState({})

  useEffect(() => {
      fetchUser(comment, setUser)
      setCommentDisplayed(comment)
      setEditing(false)
  },[comment])

  const editClickHandler = (e) => {
    e.preventDefault();
    setEditing(true)
  }

  const deleteClickHandler = () =>{
    deleteCommentDispatcher(round.id, comment.id, comments, setComments)
  }

  const commentEditSwapper = () => {
    if (!editing) {
      return (
        <div className="comment" id={`comment-${comment.id}`}>
          <div className="comment-info">
              <UserImage user={user} />
          </div>
          <div className="comment-body">
              <div id="comment-body_username">
                {user && user.username}
              </div> 
              <div id="comment-body_body">
                {commentDisplayed.body} 
              </div>
              <div id="comment-body_body-buttons">
                <button hidden={sessionUser.id !== user.id} onClick={e=>editClickHandler(e)}>edit</button>
                <button hidden={sessionUser.id !== user.id} onClick={e=>deleteClickHandler(e)}>delete</button>
              </div>
          </div>
        </div>
      )
    }else{
      return <CommentForm 
        comment={comment} 
        round={round}
        comments={comments}
        setComments={setComments}
        setCommentDisplayed={setCommentDisplayed}
        setEditing={setEditing}
        />
    }
  }

  return (
    <>
      {commentEditSwapper()}
    </>
  )
};

export default Comment;