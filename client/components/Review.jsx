
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
        for (let i = 0; i < 5; i++) {
            if (this.state.rating > 0) {
                this.state.stars.push("./images/star-16.png")
            } else {
                this.state.stars.push("./images/unfilled_star.png")
            }
            this.state.rating--;
        }
    }
    helpfulClick(e) {
        e.preventDefault();
        this.state.helpful = !this.state.helpful;
        this.setState({helpful: this.state.helpful});
    }
    readMoreToggle(e) {
        e.preventDefault();
        this.setState({readMoreClicked: !this.state.readMoreClicked})
        this.state.reviewText.length < 301 
        ? this.setState({reviewText: this.props.review.reviewText}) 
        : this.setState({reviewText: this.props.review.reviewText.slice(0, 300)});
    }
    render() {
        let helpHover, readMorePhrase;
        this.state.hoveronHelp ? helpHover = 'helpHovered' : helpHover = '';
        this.state.readMoreClicked ? readMorePhrase = '- Read less' : readMorePhrase = '+ Read more';
        if (!this.state.readMoreClicked && this.props.review.reviewText.length < 300) readMorePhrase = '';
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
                        <a id="readMore" href="#" onClick={(e) => this.readMoreToggle(e)}>{readMorePhrase}</a>
                    </div>
                    <div>
                        <div id="report" >
                            <div id="flagImg"><i>Flag</i></div>
                            <div id="reportText">Report</div>
                        </div>
                        <div id={helpHover} onClick={(e) => this.helpfulClick(e)} onMouseOver={() => this.setState({hoveronHelp: true})} onMouseLeave={() => this.setState({hoveronHelp: false})}>
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