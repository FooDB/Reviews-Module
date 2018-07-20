
class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveronHelp: false,
            helpful: false,
            readMoreClicked: false,
            reviewText: this.props.review.reviewText.slice(0, 300) + '...',
            rating: this.props.review.overallRating,
            stars: [],
            date: this.props.review.dinedDate.split('-')
        }
    }
    componentWillMount() {
        for (let i = 0; i < 5; i++) {
            this.state.rating > 0 ? this.state.stars.push("./images/star-16.png") : this.state.stars.push("./images/unfilled_star.png");
            this.state.rating--;
        }
        if (this.props.review.is_helpful) this.setState({helpful: true});
    }
    helpfulClick(e) {
        this.state.helpful = !this.state.helpful;
        this.setState({helpful: this.state.helpful});
        this.props.review.is_helpful ? this.props.review.is_helpful = 0 : this.props.review.is_helpful = 1;
        axios.post(`/helpfulEvent/${this.props.review.is_helpful}/id/${this.props.review.id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    readMoreToggle(e) {
        e.preventDefault();
        this.setState({readMoreClicked: !this.state.readMoreClicked})
        this.state.reviewText.length < 305
        ? this.setState({reviewText: this.props.review.reviewText}) 
        : this.setState({reviewText: this.props.review.reviewText.slice(0, 300)});
    }
    reportPopUp() {

    }
    render() {
        let helpHover, readMorePhrase;
        this.state.hoveronHelp ? helpHover = 'helpHovered' : helpHover = '';
        this.state.readMoreClicked ? readMorePhrase = '- Read less' : readMorePhrase = '+ Read more';
        if (!this.state.readMoreClicked && this.props.review.reviewText.length < 300) readMorePhrase = '';
        return (
            <div id="reviewContainer">
                <div>
                    <div>
                        <span>
                            <span>
                                <span>
                                    <span id="authorArea">
                                        <span><img className="img-Circle" src={this.props.review.userPhoto} /></span> 
                                        <span>{this.props.review.userName}</span>
                                        <span> ({this.props.review.userArea})</span>
                                    </span>
                                </span>
                                <div className="rating">
                                    <span id="starsAndDate">
                                        <span><img className="star" src={this.state.stars[0]} /></span>
                                        <span><img className="star" src={this.state.stars[1]} /></span>
                                        <span><img className="star" src={this.state.stars[2]} /></span>
                                        <span><img className="star" src={this.state.stars[3]} /></span>
                                        <span><img className="star" src={this.state.stars[4]} /></span>
                                        <span className="ratingDate"> {this.props.review.overallRating}.0 </span>
                                        <span className="ratingDate"> Dined on {new Date(this.state.date[0], this.state.date[1] - 1, this.state.date[2].substr(0,2)).toDateString()}</span>
                                    </span>
                                </div>
                            </span>
                        </span>
                    </div>
                </div>
                <div>
                    <p id="reviewText">{this.state.reviewText}</p>
                </div>
                <div  id="reportHelpful">
                    <div>
                        <a id="readMore" href="#" onClick={(e) => this.readMoreToggle(e)}>{readMorePhrase}</a>
                    </div>
                    <div id="subReportHelpful">
                        <span onClick={() => this.reportPopUp()}>
                            <div id="flagIcon"></div>
                            <span id="reportText">Report</span>
                        </span>
                        <span id={helpHover} 
                        onClick={(e) => this.helpfulClick(this.props.review.is_helpful)} 
                        onMouseOver={() => this.setState({hoveronHelp: true})} 
                        onMouseLeave={() => this.setState({hoveronHelp: false})}
                        value={this.props.review.is_helpful}>
                            <span id="upvoteIcon" className={helpHover}>[ ] </span>
                            <span id="helpfulText">Helpful {this.state.helpful ? '(1)' : ''}</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Review;