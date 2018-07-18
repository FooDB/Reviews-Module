
class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveronHelp: false,
            helpful: false,
            readMoreClicked: false,
            reviewText: this.props.review.reviewText.slice(0, 300),
            rating: this.props.review.overallRating,
            stars: []
        }
    }
    componentWillMount() {
        for (var i = 0; i < 5; i++) {
            if (this.state.rating > 0) {
                this.state.stars.push("./images/star-16.png")
            } else {
                this.state.stars.push("./images/unfilled_star.png")
            }
            this.state.rating--;
        }
    }
    helpfulClick() {
        this.state.helpful = !this.state.helpful;
        this.setState({helpful: this.state.helpful});
    }
    readMoreToggle() {
        this.setState({readMoreClicked: !this.state.readMoreClicked})
        this.state.reviewText.length < 301 
        ? this.setState({reviewText: this.props.review.reviewText}) 
        : this.setState({reviewText: this.props.review.reviewText.slice(0, 300)});
    }
    // getRating() {
    //     console.log('getrating called')
    //     var source;
    //     this.state.rating > 0 ? source = "./images/star-16.png" : source = "./images/unfilled_star.png"
    //     this.state.rating--;
    //     return source
    // }
    render() {
        var helpHover, readMorePhrase;
        this.state.hoveronHelp ? helpHover = 'helpHovered' : helpHover = '';
        this.state.readMoreClicked ? readMorePhrase = '- Read less' : readMorePhrase = '+ Read more';
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
                                <span>
                                    <span><img className="star" src={this.state.stars[0]} /></span>
                                    <span><img className="star" src={this.state.stars[1]} /></span>
                                    <span><img className="star" src={this.state.stars[2]} /></span>
                                    <span><img className="star" src={this.state.stars[3]} /></span>
                                    <span><img className="star" src={this.state.stars[4]} /></span>
                                </span>
                                <span>
                                    <span>{this.props.review.overallRating}.0 </span>
                                    <span> Dined on {this.props.review.dinedDate}</span>
                                </span>
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