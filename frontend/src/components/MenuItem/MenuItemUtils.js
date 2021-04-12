import Cookies from 'js-cookie';

const editMenuItemDispatcher = async(itemId, siteId, newItemData) => {
  const editItem = async () => {
    const res = await fetch(`/api/sites/${siteId}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json",
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      },
      body: JSON.stringify({newItemData})
    });
    if (res.ok) return res.json();
  } ;
  const { comment } = await editItem(itemId)
  return comment;
};

export {
  editMenuItemDispatcher
}