
class Review extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <div><img src={this.props.review.userPhoto} /> {this.props.review.userName} {this.props.review.userArea}</div>
                <div>{this.props.review.overallRating.toString()} {this.props.review.dinedDate} </div>
                <div>{this.props.review.reviewText}</div>

            </div>
        )
    }
}
export default Review;