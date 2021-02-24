import Cookies from 'js-cookie';

const createCommentDispatcher = async(round, newCommentData, comments, setComments) => {
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
};

const editCommentDispatcher = async(roundId, commentId, newCommentData, comments, setComments) => { // do comments and setComments do anything????
  const editComment = async () => {
    const res = await fetch(`/api/rounds/${roundId}/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json",
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      },
      body: JSON.stringify({newCommentData})
    });
    if (res.ok) return res.json();
  } ;
  const { comment } = await editComment(commentId)
  return comment;
};

export { 
  createCommentDispatcher,
  editCommentDispatcher
 }