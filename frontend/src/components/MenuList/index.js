import React, {useEffect, useState} from 'react';
import MenuItem from '../MenuItem';

const MenuList = ({items, siteId}) => {

    return (
        <div className="comment-feed">
                {Array.isArray(items) && items.map(item => {
                return (
                <div className="menu-list-item">
                    <MenuItem item={item} siteId={siteId} key={item.id}/>
                </div>
                )})}
        </div>
    )
}

export default MenuList;