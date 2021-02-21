import React from 'react';
import Comment from '../Comment';
import './CommentFeed.css';

const CommentFeed = ({ comments }) => {
  return (
    <div className="comment-feed">
      {!Array.isArray(comments) && <h3>Start the conversation</h3>}
      {Array.isArray(comments) && comments.map(comment => <Comment key={comment.id} comment={comment} className="comment" />)}
    </div>
  )
};

export default CommentFeed;