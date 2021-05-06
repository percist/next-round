import Cookies from 'js-cookie';

const editMenuOrderDispatcher = async(siteId, ids) => {
  const editMenuOrder = async () => {
    const res = await fetch(`/api/sites/${siteId}/items`, {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json",
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      },
      body: JSON.stringify({ ids })
    });
    if (res.ok) return res.json();
  }  
  const items = await editMenuOrder()
  return items;
}

export { 
  editMenuOrderDispatcher
}