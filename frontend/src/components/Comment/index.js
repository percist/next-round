import React, { useEffect, useState } from 'react';
import UserImage from '../UserImage';

const Comment = ({comment}) => {

  const [ user, setUser ] = useState({})

  useEffect(() => {
      const fetchUser = async()=> {
          const response = await fetch(`/api/users/${comment.userId}`)
          const user = await response.json()
          setUser(user)
          }
      fetchUser()
  },[])

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
}

export default Comment;