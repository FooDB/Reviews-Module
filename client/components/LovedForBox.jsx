import React from 'react';

const LovedForBox = (props) => {
        return (
            <a>
                <span className="lovedForBox">
                    <span><img className="lovedForIcon" src="./images/trophy.png" /> </span>
                    <span id="menuItem">{props.lovedFor.menuItem} </span>
                </span>
            </a>
        )
}
export default LovedForBox;