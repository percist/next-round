const fetchRoundItem = async (roundId, setItem) => {
  const res = await fetch(`/api/rounds/rounditems/${roundId}`)
  const { roundItem } = await res.json();
  if (roundItem) return setItem(roundItem.Item)
}
export {
  fetchRoundItem
}