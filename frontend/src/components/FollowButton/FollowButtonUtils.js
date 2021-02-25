import Cookies from 'js-cookie';

export const fetchCreateBuddy = async(userId, buddyId, setIsBuddy) =>{
  const createBuddy = async () => {
    const res = await fetch(`api/users/${userId}/buddies/${buddyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      }
    });
    if (res.ok) return res.json();
  };
  await createBuddy()
  await setIsBuddy(true)
}