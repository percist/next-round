const fetchPaidRounds = async (setNumRounds) => {
  const response = await fetch('/api/rounds/user/total');
  const roundsToRedeem = await response.json();
  setNumRounds(roundsToRedeem);
}
const fetchOwnedSites = async (setSitesOwned) => {
  const response = await fetch('/api/sites/user');
  const sitesUserOwns = await response.json();
  setSitesOwned(sitesUserOwns);
}

export {
  fetchOwnedSites,
  fetchPaidRounds
}