import React from 'react';
import FilterBox from './FilterBox.jsx';

const ReviewToolbar = (props) => {
    return (
        <div id="toolbarContainer">
            <div id="toolbarSortText">Sort By</div>
            <div id="sortSelection">
                <select id="sortMethod" onChange={() => props.sortReviews()}>
                    <option value="Newest">Newest</option>
                    <option value="Highest">Highest Rating</option>
                    <option value="Lowest">Lowest Rating</option>
                </select>
            </div>
            <div id="filtersHeader">Filters</div>
            <div>
                {props.keyWords.map(keyWord => <FilterBox keyWord={keyWord} key={keyWord.id} filterReviews={props.filterReviews}/>)}
            </div>
        </div>
    )
}
export default ReviewToolbar;