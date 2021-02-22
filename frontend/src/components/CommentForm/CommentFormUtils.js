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


export { createCommentDispatcher }