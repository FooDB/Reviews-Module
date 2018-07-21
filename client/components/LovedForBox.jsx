import React from 'react';

const LovedForBox = (props) => {
        return (
            <a>
                <span className="filterCheckBox" onClick={() => ''}>
                    <span><img className="star" src="./images/trophy.png" /> </span>
                    <span>{props.lovedFor.menuItem} </span>
                </span>
            </a>
        )
}
export default LovedForBox;