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
            <div> Test reviewlist
                {this.props.reviews.map(review => <Review review={review}/>)}
            </div>
        )
    }
}

export default ReviewList;
