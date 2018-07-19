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
                <h1>Reviews</h1>
                {this.props.reviews.map(review => <Review review={review} key={review.id}/>)}
            </div>
        )
    }
}

export default ReviewList;
