export const fetchUser = async(comment, updateState)=> {
  const response = await fetch(`/api/users/${comment.userId}`)
  const user = await response.json()
  updateState(user)
};