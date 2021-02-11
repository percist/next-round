import React, {useEffect, useState} from 'react';
import ItemCard from '../ItemCard';

//TODO: map over items and pass each item to the item card
const ItemCardContainer = ({items}) => {

    const [ overflow, setOverflow ] = useState(false)
    const [ showAll, setShowAll ] = useState(false)
    const [ hideButton, setHideButton ] = useState(true)
    const [ numItems, setNumItems ] = useState(0)
   
    const handleShowClick = (e) => {
        e.preventDefault();
        setShowAll(true);
        setHideButton(false);
    }
    const handleHideClick = (e) => {
        e.preventDefault();
        setShowAll(false);
        setHideButton(true);
    }
    
    useEffect(() => {
       if (Array.isArray(items)) {
        setNumItems(items.length)
        if (items.length > 3) {
            setOverflow(true)
        }
        } 
    }, [items])

    return (
        <div className="item-card-container">
            <div id="item-card-container_initial">
                {!Array.isArray(items) && <h2>loading...</h2> }
                {Array.isArray(items) && items.slice(0,3).map((item,i) => {
                        if (item) return <ItemCard item={item} key={i}/>
                        else return null
                })}  
            </div>
            <button hidden={showAll} onClick={handleShowClick}>
                Show All Items
            </button>
            <div hidden={hideButton} id="item-card-container_additional">
                {!Array.isArray(items) && <h2>loading...</h2> }
                {Array.isArray(items) && items.slice(2).map((item,i) => {
                        if (item) return <ItemCard item={item} key={i}/>
                        else return null
                })}
            </div>
            <button hidden={hideButton} onClick={handleHideClick}>
                Hide Items
            </button>
        </div>
        )
}

export default ItemCardContainer;