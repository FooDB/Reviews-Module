import React from 'react';

const LovedForBox = (props) => {
        return (
            <a>
                <span className="lovedForBox">
                    <span><img className="lovedForIcon" src="https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/trophy.png" /> </span>
                    <span id="menuItem">{props.lovedFor.menuItem} </span>
                </span>
            </a>
        )
}
export default LovedForBox;