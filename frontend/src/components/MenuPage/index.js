import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllSiteItems } from '../../store/items'
import MenuForm from '../MenuForm'
import MenuList from '../MenuList'

const MenuPage = () => {

    const params = useParams();
    const { siteId } = params
    
    const dispatch = useDispatch();

    const items = useSelector(fullReduxState => {
        return fullReduxState.items;
    })

    useEffect(() => {
        dispatch(fetchAllSiteItems(siteId))
    },[dispatch, siteId, MenuForm])
    
    return (
        <div className="menu">
            <div className="menu-list">
                <MenuList items={items} siteId={siteId}/>
            </div>
            <MenuForm siteId={siteId}/>
        </div>
    )
}

export default MenuPage;