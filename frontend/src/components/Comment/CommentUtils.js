import Cookies from 'js-cookie';

const fetchUser = async(comment, updateState)=> {
  const response = await fetch(`/api/users/${comment.userId}`)
  const user = await response.json()
  updateState(user)
};

const deleteCommentDispatcher = async(roundId, commentId, comments, setComments) => {
  const deleteComment = async () => {
    const res = await fetch(`/api/rounds/${roundId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json",
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      },
    });
    if (res.ok) return res.json();
  } ;
  deleteComment(commentId)
  await setComments([...comments.filter(comment => comment.id !== commentId)])
};

export {
  fetchUser,
  deleteCommentDispatcher
}