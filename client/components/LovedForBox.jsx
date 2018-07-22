import React from 'react';

const LovedForBox = (props) => {
        return (
            <a>
                <span className="filterCheckBox">
                    <span><img className="star" src="./images/trophy.png" /> </span>
                    <span id="menuItem">{props.lovedFor.menuItem} </span>
                </span>
            </a>
        )
}
export default LovedForBox;