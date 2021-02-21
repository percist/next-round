import React, { useEffect, useState } from 'react';
import UserImage from '../UserImage';
import {fetchUser} from './CommentUtils';

const Comment = ({comment}) => {
  const [ user, setUser ] = useState({});

  useEffect(() => {
      fetchUser(comment, setUser)
  },[comment])

  return (
    <div className="comment" id={`comment-${comment.id}`}>
        <div className="comment-info">
            <UserImage user={user} />
        </div>
        <div className="comment-body">
            <div id="comment-body_username">
              {user && user.username}
            </div> 
            {comment.body}
        </div>
    </div>
  )
};

export default Comment;