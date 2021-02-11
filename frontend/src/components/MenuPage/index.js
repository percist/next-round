import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllSiteItems } from '../../store/items'
import MenuForm from '../MenuForm'
import MenuList from '../MenuList'

const MenuPage = () => {

    const params = useParams();
    const { siteId } = params
    const items = useSelector(fullReduxState => {
        return fullReduxState.items;
    })

    const [ itemsToDisplay, setItemsToDisplay ] = useState([])
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllSiteItems(siteId))
    },[dispatch, siteId])

    useEffect(() => {
        if(items[0])
        setItemsToDisplay([...items])
    },[dispatch, items])


    
    return (
        <div className="menu">
            <div className="menu-list">
                <MenuList itemsToDisplay={itemsToDisplay} setItemsToDisplay={setItemsToDisplay} siteId={siteId}/>
            </div>
            <MenuForm siteId={siteId} itemsToDisplay={itemsToDisplay} setItemsToDisplay={setItemsToDisplay}/>
        </div>
    )
}

export default MenuPage;