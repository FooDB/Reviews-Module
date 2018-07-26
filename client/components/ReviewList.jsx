import React from 'react';
import Review from './Review.jsx';

const ReviewList = ({ reviews }) => (
  <div id="reviewsContainer">
    {reviews.map(review => <Review review={review} key={review.id} />)}
  </div>
);

export default ReviewList;
