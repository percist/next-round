import Cookies from 'js-cookie';

export const fetchDeleteBuddy = async (userId, buddyId, setIsBuddy) => {
  const deleteBuddy = async () => {
    const res = await fetch(`/api/users/${userId}/buddies/${buddyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json",
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      }
    });
    if (res.ok) return res.json();
  }
  await deleteBuddy();
  await setIsBuddy(false);
}