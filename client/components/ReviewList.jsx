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
            <div>
                <h1>Reviews Workflow Test</h1>
                {this.props.reviews.map(review => <Review review={review} key={review.id}/>)}
            </div>
        )
    }
}

export default ReviewList;
