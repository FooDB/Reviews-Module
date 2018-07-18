
class Review extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <div>
                    <div>
                        <div><img className="img-Circle" src={this.props.review.userPhoto} /></div> 
                        <div>
                            <div id="authorArea">
                                <span>
                                    <span>{this.props.review.userName}</span>
                                    <span> ({this.props.review.userArea})</span>
                                </span>
                            </div>
                            <div className="rating">
                                <div>
                                    <div>Rating: {this.props.review.overallRating}</div>
                                    <div>Rating: {this.props.review.overallRating}</div>
                                    <div>Rating: {this.props.review.overallRating}</div>
                                    <div>Rating: {this.props.review.overallRating}</div>
                                    <div>Rating: {this.props.review.overallRating}</div>
                                </div>
                                <div>
                                    <span>{this.props.review.overallRating}.0 </span>
                                    <span> {this.props.review.dinedDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="reviewBodyContainer">
                    <p id="reviewText">{this.props.review.reviewText}</p>
                </div>
                <div>
                    <div>
                        <a id="readMore" href="#">+ Read more</a>
                    </div>
                    <div>
                        <div id="report">
                            <div id="flagImg"><i>Flag</i></div>
                            <div id="reportText">Report</div>
                        </div>
                        <div id="helpful">
                            <div id="upvoteImg"><i>Upvote</i></div>
                            <div id="reportText">Helpful {this.props.review.helpful}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Review;