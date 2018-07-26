import React from 'react';
import Review from './Review.jsx';

const ReviewList = props => (
  <div id="reviewsContainer">
    {props.reviews.map(review => <Review review={review} key={review.id} />)}
  </div>
)

export default ReviewList;
