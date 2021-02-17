import React from 'react';
import ItemCardContainer from '../ItemCardContainer';

//TODO: set rounds state to be all rounds user completed
//TODO: set drinks state to be all drinks associated with rounds user completed
//TODO: set site state to be all sites associated with items associate with rounds a user has received and are completed. include items
const SiteCard = () => {

  let items;
  return (
    <div className="site-card">
      <div className="site-card-header">
        <div className="site-card-header_name">
          Site.name
                </div>
        <div className="site-card-header_location">
          site.address, site.city, site.state
                </div>
      </div>
      <div className="site-card-drinks_container">
        <ItemCardContainer items={items} />
      </div>
    </div>
  )
}

export default SiteCard;