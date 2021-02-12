import React from 'react';
// import './roundCard.css'

const RoundsClaimRound = ({round}) => {
    return (
        <div className="rounds-claim-card">
            <div id="rounds-claim-card_image">
                {!round.imgUrl && <img src="https://img.icons8.com/fluent/96/000000/beer-glass.png"/>}
                {round.imgUrl && <img src={round.imgUrl} alt={round.name}/>}
            </div>
            <div id="rounds-claim-card_name">
                {round.Items[0].name} at {round.Items[0].Sites[0].name}
            </div>
        </div>
        )
}

export default RoundsClaimRound;