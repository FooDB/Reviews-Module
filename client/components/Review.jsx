
class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveronHelp: false,
            helpful: false,
            readMoreClicked: false,
            reviewText: this.props.review.reviewText.slice(0, 300),
            rating: this.props.review.overallRating
        }
    }
    componentDidMount() {

    }
    helpfulClick() {
        this.state.helpful = !this.state.helpful;
        this.setState({helpful: this.state.helpful});
    }
    readMoreToggle() {
        // this.state.readMoreClicked = !this.state.readMoreClicked;
        this.setState({readMoreClicked: !this.state.readMoreClicked})
        this.state.reviewText.length < 301 
        ? this.setState({reviewText: this.props.review.reviewText}) 
        : this.setState({reviewText: this.props.review.reviewText.slice(0, 300)});
    }
    getRating() {
        console.log('getrating called')
        var source;
        this.state.rating > 0 ? source = "./images/star-16.png" : source = "./images/unfilled_star.png"
        this.state.rating--;
        return source
    }
    render() {
        var helpHover, readMorePhrase, source;
        this.state.hoveronHelp ? helpHover = 'helpHovered' : helpHover = '';
        this.state.readMoreClicked ? readMorePhrase = '- Read less' : readMorePhrase = '+ Read more';
        // if (this.state.rating > 0) {
        //     source = "./images/star-16.png";
        //     this.state.rating--;
        // } else {
        //     source = "./images/unfilled_star.png"
        // }
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
                                    {/* <div><img src="./images/star-16.png" /></div>
                                    <div><img className="greyStar" src="./images/unfilled_star.png" /></div>
                                    <div>Rating: {this.props.review.overallRating}</div>
                                    <div>Rating: {this.props.review.overallRating}</div>
                                    <div>Rating: {this.props.review.overallRating}</div> */}
                                    <div><img className="star" src={this.getRating()} /></div>
                                    <div><img className="star" src={this.getRating()} /></div>
                                    <div><img className="star" src={this.getRating()} /></div>
                                    <div><img className="star" src={this.getRating()} /></div>
                                    <div><img className="star" src={this.getRating()} /></div>
                                </div>
                                <div>
                                    <span>{this.props.review.overallRating}.0 </span>
                                    <span> Dined on {this.props.review.dinedDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="reviewBodyContainer">
                    <p id="reviewText">{this.state.reviewText}</p>
                </div>
                <div>
                    <div>
                        <a id="readMore" href="#" onClick={() => this.readMoreToggle()}>{readMorePhrase}</a>
                    </div>
                    <div>
                        <div id="report" >
                            <div id="flagImg"><i>Flag</i></div>
                            <div id="reportText">Report</div>
                        </div>
                        <div id={helpHover} onClick={() => this.helpfulClick()} onMouseOver={() => this.setState({hoveronHelp: true})} onMouseLeave={() => this.setState({hoveronHelp: false})}>
                            <div id="upvote"><i>Upvote</i></div>
                            <div id="helpfulText">Helpful {this.state.helpful ? '(1)' : ''}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Review;