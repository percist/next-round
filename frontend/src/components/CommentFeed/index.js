import React from 'react';
import Comment from '../Comment';
import './CommentFeed.css';

const CommentFeed = ({ round, comments, setComments }) => {
  return (
    <div className="comment-feed">
      {!Array.isArray(comments) && <h3>Start the conversation</h3>}
      {Array.isArray(comments) && 
        comments[0] && 
        comments.sort((a,b)=>new Date(a.updatedAt) - new Date(b.updatedAt))
                .map(comment => {
        return <Comment 
          key={comment.id}
          round={round} 
          comment={comment} 
          comments={comments} 
          setComments={setComments} 
          className="comment" 
        />
      })}
    </div>
  )
};

export default CommentFeed;