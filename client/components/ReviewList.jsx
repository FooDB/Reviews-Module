import React from 'react';
import Review from './Review.jsx';

const ReviewList = (props) => {
    return (
        <div id="reviewsContainer">
            {props.reviews.map(review => <Review review={review} key={review.id}/>)}
        </div>
    )
}

export default ReviewList;
