import React from 'react';
import Review from './Review.jsx';

class ReviewList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div id="reviewsContainer">
                {this.props.reviews.map(review => <Review review={review} key={review.id}/>)}
            </div>
        )
    }
}

export default ReviewList;
