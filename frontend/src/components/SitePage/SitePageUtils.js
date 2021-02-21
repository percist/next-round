const checkIsOwner = async (user, siteId, setIsOwner) => {
  const response = await fetch(`/api/sites/${siteId}/owners`);
  const owners = await response.json();
  if (Array.isArray(owners.siteOwners)) {
    owners.siteOwners.forEach(owner => {
      if (owner.userId === user.id) setIsOwner(true)
    });
  };
};

export {
  checkIsOwner
}