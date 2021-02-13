import React, {useEffect, useState} from 'react';
import ItemCard from '../ItemCard';
import "./ItemCardContainer.css"

//TODO: map over items and pass each item to the item card
const ItemCardContainer = ({items}) => {

    // const [ overflow, setOverflow ] = useState(true)
    const [ overflowItemsShown, setOverflowItemsShown ] = useState(false)
    const [ showButton, setShowButton ] = useState(true)
    const [ hideButton, setHideButton ] = useState(true)
    const [ numItems, setNumItems ] = useState(0)
   
    const handleShowClick = (e) => {
        e.preventDefault();
        setHideButton(false);
        setShowButton(true);
        setOverflowItemsShown(true);
    }
    const handleHideClick = (e) => {
        e.preventDefault();
        setHideButton(true);
        setShowButton(false)
        setOverflowItemsShown(false);
    }

    useEffect(() => {
        if (Array.isArray(items) && items.length > 4) {
            setShowButton(false)
        } 
    }, [items])

    const overflow = () => {
        if (!!overflowItemsShown) {
            return (
                <>
                    {!Array.isArray(items) && <h2>loading...</h2> }
                    {Array.isArray(items) && items.slice(5).map(item => {
                        if (item) {
                            return <ItemCard item={item} key={item.name}/>
                        }else return null
                    })}
                </>
            )
        }else{
            return null
        }
    }

    return (
        <div className="item-card-container">
            <div id="item-card-container_initial">
                {!Array.isArray(items) && <h2>loading...</h2> }
                {Array.isArray(items) && items.slice(0,5).map((item,i) => {
                    if (item) return <ItemCard item={item} key={i}/>
                        else return null
                })}  
            </div>
            <button hidden={showButton} onClick={handleShowClick}>
                Show All Items
            </button>
            <div id="item-card-container_additional">
                {overflow()}
            </div>
            <button hidden={hideButton} onClick={handleHideClick}>
                Hide Items
            </button>
        </div>
        )
}

export default ItemCardContainer;