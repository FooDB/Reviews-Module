import Review from './Review.jsx';
import React from 'react';
class ReviewList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>Reviews
                {this.props.reviews.map(review => <Review review={review} key={review.id}/>)}
            </div>
        )
    }
}

export default ReviewList;
