const receiverFetchFunction = async (round, type, setReceiver) => {
  if (type === "user") {
    const fetchReceiver = async (userId) => {
      const res = await fetch(`/api/users/${userId}`);
      const user = await res.json();
      return user;
    }
    const thisUser = await fetchReceiver(round.receiverId);
    await setReceiver(thisUser);
  }
};

const fetchRoundComments = async (round, setComments) => {
  const res = await fetch(`/api/rounds/${round.id}/comments`);
  const { roundComments } = await res.json();
  setComments(roundComments);
};

export {
  receiverFetchFunction,
  fetchRoundComments
}