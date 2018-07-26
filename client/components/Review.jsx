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
      upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/whiteUpvote.png',
      readMoreClicked: false,
      reviewText: this.props.review.reviewText.slice(0, 200),
      stars: [],
      reportClicked: false,
      reportPopUp: '',
      randomColor: '#ffffff'
    };
  }

  componentDidMount() {
    let initialRating = this.props.review.overallRating;
    for (let i = 0; i < 5; i++) {
      initialRating > 0 
        ? this.state.stars.push("https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redStar.png") 
        : this.state.stars.push("https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/greyStar.png");
      initialRating--;
    }
    if (this.props.review.is_helpful) this.setState({ helpful: true });
    this.setState({ stars: this.state.stars });
    const circleColors = ['#df4e96', '#bb6acd', '#6c8ae4', '#d86441'];
    this.setState({ randomColor: circleColors[Math.floor(Math.random() * circleColors.length)] });
    if (this.props.review.reviewText.length > 200) this.setState({ reviewText: this.props.review.reviewText.slice(0, 200) + '...' });
  }

  setNode(node) {
    this.node = node;
  }

  helpfulClick() {
    this.setState({ helpful: !this.state.helpful });
    this.state.helpful 
      ? this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redUpvote.png' }) 
      : this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/whiteUpvote.png' });
    this.props.review.is_helpful ? this.props.review.is_helpful = 0 : this.props.review.is_helpful = 1;
    axios.post(`/helpfulEvent/${this.props.review.is_helpful}/id/${this.props.review.id}`)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  readMoreToggle(e) {
    e.preventDefault();
    this.setState({ readMoreClicked: !this.state.readMoreClicked });
    this.state.reviewText.length < 305
      ? this.setState({ reviewText: this.props.review.reviewText }) 
      : this.setState({ reviewText: this.props.review.reviewText.slice(0, 200) + '...' });
  }

  toggleReportModal() {
    this.setState({ reportClicked: !this.state.reportClicked }, () => this.reportPopUp());
  }

  handleOutsideClick(e) {
    if (this.node && this.node.contains(e.target)) return;
    this.setState({ reportClicked: false }, () => this.reportPopUp());
  }

  reportPopUp() {
    this.setState({ reportPopUp: (this.state.reportClicked 
      ? (
        <ReportPopUp 
          setNode={this.setNode.bind(this)} 
          outsideClick={this.handleOutsideClick.bind(this)}
          toggleReportModal={this.toggleReportModal.bind(this)}/>
      )
      : ''),
    });
  }

  render() {
    const helpHover = (this.state.hoveronHelp ? 'helpHovered' : 'placeholder');
    const reviewDate = this.props.review.dinedDate.split('-');
    let readMorePhrase = (this.state.readMoreClicked ? '- Read less' : '+ Read more');
    if (!this.state.readMoreClicked && this.props.review.reviewText.length < 300) readMorePhrase = '';
    const reviewPluralCase = (this.props.review.userReviewCount === 1 ? 'review' : 'reviews');
    const initials = this.props.review.userName.split(' ')[0][0] + this.props.review.userName.split(' ')[1][0];

    return (
      <div id="reviewContainer">
        {this.state.reportPopUp}
        <div className="twoHalvesContainer">

          <div className="leftHalf" id="reviewLeftHalf">
            <div id="reviewCircleContainer">
              <div className="authorCircle" style={{ backgroundColor: this.state.randomColor }}>
                <div id="reviewInitials">{initials}</div>
              </div>
            </div>
            <div id="usernameContainer">
              <span>
                <span id="reviewUsername">{this.props.review.userName}</span>
              </span>
            </div>
            <span id="userCity">{this.props.review.userArea}</span>
            <div id="userReviewsContainer">
              <span className="commentIcon" />
              <span>&nbsp; {this.props.review.userReviewCount} {reviewPluralCase}</span>
            </div>
          </div>

          <div className="rightHalf" id="reviewRightHalf">

            <div id="reviewStarsDateRating">
              <div id="reviewStarsDate">
                <div id="reviewStarsContainer">
                  <img className="reviewStar" src={this.state.stars[0]} alt="Star Icon" />
                  <img className="reviewStar" src={this.state.stars[1]} alt="Star Icon" />
                  <img className="reviewStar" src={this.state.stars[2]} alt="Star Icon" />
                  <img className="reviewStar" src={this.state.stars[3]} alt="Star Icon" />
                  <img className="reviewStar" src={this.state.stars[4]} alt="Star Icon" />
                </div>
                <span className="reviewRatingDate"> Dined on {new Date(reviewDate[0], reviewDate[1] - 1, reviewDate[2].substr(0,2)).toDateString()}</span>
              </div>
              <div id="reviewRatingsContainer">
                <span className="reviewRatingCategory">Overall </span>
                <span className="reviewRatingNumber">{this.props.review.overallRating} &nbsp;</span>
                <span className="reviewRatingCategory">&#8226; Food </span>
                <span className="reviewRatingNumber">{this.props.review.foodRating} &nbsp;</span>
                <span className="reviewRatingCategory">&#8226; Service </span>
                <span className="reviewRatingNumber">{this.props.review.serviceRating} &nbsp;</span>
                <span className="reviewRatingCategory">&#8226; Ambiance </span>
                <span className="reviewRatingNumber">{this.props.review.ambianceRating}</span>
              </div>
            </div>

            <div>
              <p id="reviewText">{this.state.reviewText}</p>
            </div>

            <div id="reportHelpful">
              <div>
                <a id="readMore" href="#" onClick={(e) => this.readMoreToggle(e)}>{readMorePhrase}</a>
              </div>
              <div id="subReportHelpful">
                <div className="flexCenter" onClick={(e) => this.toggleReportModal(e)}>
                  <div id="flagIcon" />
                  <span className="reportText">Report</span>
                </div>
                <div className="flexCenter"
                  id={helpHover} 
                  value={this.props.review.is_helpful}
                  onClick={() => this.helpfulClick(this.props.review.is_helpful)} 
                  onMouseOver={() => this.setState({ hoveronHelp: true, upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redUpvote.png' })} 
                  onMouseLeave={() => {
                    this.setState({ hoveronHelp: false });
                    this.state.helpful ? this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redUpvote.png' }) : this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/whiteUpvote.png' });
                  }}>
                  <div className="flex" >
                    <img id="upvoteIcon" src={this.state.upvoteIcon} alt="upvote Icon" />
                  </div>
                  <span className="reportText">Helpful {this.state.helpful ? '(1)' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Review;

Review.propTypes = {
    lovedFor: PropTypes.array.isRequired,
    filter: PropTypes.func.isRequired,
    scrollToTopOfFeed: PropTypes.func.isRequired,
    allReviews: PropTypes.array.isRequired,
    restaurantInfo: PropTypes.array.isRequired,
    stars: PropTypes.array.isRequired,
};
