import React from "react";
import Cookies from 'js-cookie';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const CommentForm = ({ round, comments, setComments }) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.session);

  const [comment, setComment] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const newCommentData = {
      userId: user.id,
      body: comment,
      roundId: round.id
    };
    const createCommentDispatcher = async() => {
      const createComment = async () => {
        const res = await fetch(`/api/rounds/${round.id}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
            'XSRF-Token': Cookies.get('XSRF-TOKEN')
          },
          body: JSON.stringify({newCommentData})
        });
        if (res.ok) return res.json();
      } ;
      const { roundComment } = await createComment()
      await setComments([...comments, roundComment])
    }
    createCommentDispatcher()
    setComment("")
  }

  return (
    <div className="comment-form_wrapper">
    <form className="comment-form" onSubmit={onSubmit}>
        <textarea value={comment} onChange={e => setComment(e.target.value)} className="input-field"/>
      <button type="submit" className="submit-button">Send</button>
    </form>
  </div>
  )

}

export default CommentForm