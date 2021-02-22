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

const editCommentDispatcher = async(roundId, commentId, newCommentData, comments, setComments) => {
  const editComment = async () => {
    const res = await fetch(`/api/rounds/${roundId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json",
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      },
      body: JSON.stringify({newCommentData})
    });
    if (res.ok) return res.json();
  } ;
  const { roundComment } = await editComment(commentId)
  await setComments([...comments, roundComment])
};

export {
  fetchUser,
  deleteCommentDispatcher,
  editCommentDispatcher
}