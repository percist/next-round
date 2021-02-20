import React, { useEffect, useState } from 'react';

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
            {/* {user && <UserImage user={user} />} */}
            {user && user.username}
        </div>
        <div className="comment-body">
            {comment.body}
        </div>
    </div>
)
}

export default Comment;