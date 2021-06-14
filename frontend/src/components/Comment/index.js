import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentForm from '../CommentForm';
import {timeDifference} from '../../dateUtilities';
import UserImage from '../UserImage';
import {fetchUser, deleteCommentDispatcher } from './CommentUtils';

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
            <div className="comment-body_info">
              <div className="comment-body_username">
                {user && user.username}
              </div> 
              <div className="comment-body_body">
                {commentDisplayed.body} 
              </div>
            </div>
              <div className="comment-body_body-buttons" >
                <div className="comment-body_body-buttons_1" hidden={sessionUser.id !== user.id}>
                  <button 
                    className="comment-button" 
                    onClick={e=>editClickHandler(e)}
                    aria-label="edit comment"
                    >
                      edit
                      </button>
                  ·
                  <button 
                    className="comment-button" 
                    onClick={e=>deleteClickHandler(e)}
                    aria-label="delete comment"
                    >
                      delete
                      </button>
                  ·
                </div>
                {timeDifference(comment.updatedAt)}
              </div>
          </div>
        </div>
      )
    }else{
      return <CommentForm 
        round={round}
        comments={comments}
        setComments={setComments}
        commentDisplayed={commentDisplayed}
        setCommentDisplayed={setCommentDisplayed}
        editing={editing}
        setEditing={setEditing}
        />
    }
  }

  return (
    <div>
      {commentEditSwapper()}
    </div>
  )
};

export default Comment;