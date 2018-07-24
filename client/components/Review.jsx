import React from 'react';
import axios from 'axios';
import ReportPopUp from './ReportPopUp.jsx';
import { debug } from 'util';

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveronHelp: false,
            helpful: false,
            upvoteIcon: './images/whiteUpvote.png',
            readMoreClicked: false,
            reviewText: this.props.review.reviewText.slice(0, 300) + '...',
            stars: [],
            reportClicked: false,
            reportPopUp: '',
        }
    }
    componentDidMount() {
        let initialRating = this.props.review.overallRating;
        for (let i = 0; i < 5; i++) {
            initialRating > 0 ? this.state.stars.push("./images/redStar.png") : this.state.stars.push("./images/greyStar.png");
            initialRating--;
        }
        if (this.props.review.is_helpful) this.setState({helpful: true});
        this.setState({stars: this.state.stars})
    }
    helpfulClick() {
        this.setState({helpful: !this.state.helpful});
        this.state.helpful ? this.setState({upvoteIcon: './images/redUpvote.png'}) : this.setState({upvoteIcon: './images/whiteUpvote.png'})
        this.props.review.is_helpful ? this.props.review.is_helpful = 0 : this.props.review.is_helpful = 1;
        axios.post(`/helpfulEvent/${this.props.review.is_helpful}/id/${this.props.review.id}`)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }
    readMoreToggle(e) {
        e.preventDefault();
        this.setState({readMoreClicked: !this.state.readMoreClicked})
        this.state.reviewText.length < 305
        ? this.setState({reviewText: this.props.review.reviewText}) 
        : this.setState({reviewText: this.props.review.reviewText.slice(0, 300)});
    }
    toggleReportModal(e) {
        e.preventDefault()
        this.setState({reportClicked: !this.state.reportClicked}, () => this.reportPopUp());
    }
    handleOutsideClick(e) {
        if (this.node && this.node.contains(e.target)) return;
        this.setState({reportClicked: false}, () => this.reportPopUp())
    }
    reportPopUp() {
        this.setState({reportPopUp: (this.state.reportClicked 
            ? <ReportPopUp 
                setNode={this.setNode.bind(this)} 
                outsideClick={this.handleOutsideClick.bind(this)}
                toggleReportModal={this.toggleReportModal.bind(this)}/>
            : '')
        })
    }
    setNode(node) {
        this.node = node
    }
    render() {
        const helpHover = (this.state.hoveronHelp ? 'helpHovered' : 'placeholder');
        const reviewDate = this.props.review.dinedDate.split('-')
        let readMorePhrase = (this.state.readMoreClicked ? readMorePhrase = '- Read less' : readMorePhrase = '+ Read more');
        if (!this.state.readMoreClicked && this.props.review.reviewText.length < 300) readMorePhrase = '';

        return (
            <div id="reviewContainer">
                {this.state.reportPopUp}
                <div>
                    <div>
                        <span>
                            <div>
                                <div className="authorArea">
                                    <span><img className="imgCircle" src={this.props.review.userPhoto} /></span> 
                                </div>
                                <div className="authorArea">
                                    <div>
                                        <span>{this.props.review.userName} &nbsp;</span>
                                        <span> ({this.props.review.userArea})</span>
                                    </div>
                                    <div id="starsAndDate">
                                        <span><img className="star" src={this.state.stars[0]} /></span>
                                        <span><img className="star" src={this.state.stars[1]} /></span>
                                        <span><img className="star" src={this.state.stars[2]} /></span>
                                        <span><img className="star" src={this.state.stars[3]} /></span>
                                        <span><img className="star" src={this.state.stars[4]} /></span>
                                        <span className="ratingDate"> {this.props.review.overallRating}.0 </span>
                                        <span className="ratingDate"> Dined on {new Date(reviewDate[0], reviewDate[1] - 1, reviewDate[2].substr(0,2)).toDateString()}</span>
                                    </div>
                                </div>
                            </div>
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
                        <span className="flex" onClick={(e) => this.toggleReportModal(e)}>
                            <div id="flagIcon"></div>
                            <span id="reportText">Report</span>
                        </span>
                        <span className="flex" id={helpHover} 
                              onClick={() => this.helpfulClick(this.props.review.is_helpful)} 
                              onMouseOver={() => this.setState({hoveronHelp: true, upvoteIcon: './images/redUpvote.png'})} 
                              onMouseLeave={() => {
                                    this.setState({hoveronHelp: false});
                                    this.state.helpful ? this.setState({upvoteIcon: './images/redUpvote.png'}) : this.setState({upvoteIcon: './images/whiteUpvote.png'})
                                }}
                              value={this.props.review.is_helpful}>
                            <div className="flex" ><img id="upvoteIcon" src={this.state.upvoteIcon} /></div>
                            <span className="flex">&nbsp; Helpful {this.state.helpful ? '(1)' : ''}</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Review;