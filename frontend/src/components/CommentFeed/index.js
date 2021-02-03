import React, { useEffect, useState } from 'react';
import Comment from '../Comment';


const CommentFeed = ({ comments, user, post }) => {
    const [ reply, setReply ] = useState("");
    const [ commentsToShow, setCommentsToShow ] = useState([comments])

    const createComment = async(content, postId) => {
        const response = await fetch(`/api/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                postId,
                content
            }),
        });
        return await response.json()
    };

    const fetchComment = async(comment) => {
        const response = await fetch(`/api/post/${post.id}/comments/${comment.id}`)
        const newComment = await response.json()
        setCommentsToShow([...newComment])
      }

    const onSubmit = async(event) => {
        event.preventDefault();
        const comment = await createComment(reply, post.Id)
        fetchComment(comment.id)
    }

    return (
        <>
            {commentsToShow.map(comment => <Comment comment={comment} key={`${comment.id}`} />
            )}
            <form className="comment-form" onSubmit={onSubmit}>
                <textarea 
                    className="comment-field"
                    type="text"
                    name="comment"
                    onChange={(event) => setReply(event.target.value)}
                    value={reply}
                />
                <button type="submit" className="comment" id="comment-button">Reply</button>
            </form>
        </>
    )
}

export default CommentFeed;