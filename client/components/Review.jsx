import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReportPopUp from './ReportPopUp.jsx';
import styles from './Review.css';

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
      randomColor: '#ffffff',
    };
  }

  componentDidMount() {
    const { review } = this.props;
    const { stars } = this.state;
    let initialRating = review.overallRating;
    for (let i = 0; i < 5; i++) {
      initialRating > 0 
        ? stars.push("https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redStar.png") 
        : stars.push("https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/greyStar.png");
      initialRating--;
    }
    if (review.is_helpful) this.setState({ helpful: true });
    this.setState({ stars });
    const circleColors = ['#df4e96', '#bb6acd', '#6c8ae4', '#d86441'];
    this.setState({ randomColor: circleColors[Math.floor(Math.random() * circleColors.length)] });
    if (review.reviewText.length > 200) this.setState({ reviewText: review.reviewText.slice(0, 200) + '...' });
  }

  setNode(node) {
    this.node = node;
  }

  helpfulClick() {
    const { review } = this.props;
    const { helpful } = this.state;
    this.setState({ helpful: !helpful });
    helpful
      ? this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redUpvote.png' }) 
      : this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/whiteUpvote.png' });
    review.is_helpful ? review.is_helpful = 0 : review.is_helpful = 1;
    axios.post(`/restaurant/${review.is_helpful}/id/${review.id}/helpfulEvent`)
      .then()
      .catch(err => console.error(err));
  }

  readMoreToggle(e) {
    const { review } = this.props;
    const { reviewText } = this.state;
    e.preventDefault();
    this.setState({ readMoreClicked: !this.state.readMoreClicked });
    reviewText.length < 305
      ? this.setState({ reviewText: review.reviewText }) 
      : this.setState({ reviewText: review.reviewText.slice(0, 200) + '...' });
  }

  toggleReportModal() {
    const { reportClicked } = this.state;
    this.setState({ reportClicked: !reportClicked }, () => this.reportPopUp());
  }

  handleOutsideClick(e) {
    if (this.node && this.node.contains(e.target)) return;
    this.setState({ reportClicked: false }, () => this.reportPopUp());
  }

  reportPopUp() {
    const { reportClicked } = this.state;
    this.setState({ reportPopUp: (reportClicked
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
    const { review } = this.props;
    const { hoveronHelp, readMoreClicked, reportPopUp, randomColor, stars, reviewText, upvoteIcon, helpful } = this.state;
    const helpHover = (hoveronHelp ? 'helpHovered' : 'placeholder');
    const reviewDate = review.dinedDate.split('-');
    let readMorePhrase = (readMoreClicked ? '- Read less' : '+ Read more');
    if (!readMoreClicked && review.reviewText.length < 200) readMorePhrase = '';
    const reviewPluralCase = (review.userReviewCount === 1 ? 'review' : 'reviews');
    const initials = review.userName.split(' ')[0][0] + review.userName.split(' ')[1][0];

    return (
      <div id="reviewContainer">
        {reportPopUp}
        <div className="twoHalvesContainer">

          <div className="leftHalf" id="reviewLeftHalf">
            <div id="reviewCircleContainer">
              <div className="authorCircle" style={{ backgroundColor: randomColor }}>
                <div id="reviewInitials">{initials}</div>
              </div>
            </div>
            <div id="usernameContainer">
              <span>
                <span id="reviewUsername">{review.userName}</span>
              </span>
            </div>
            <span id="userCity">{review.userArea}</span>
            <div id="userReviewsContainer">
              <span className="commentIcon" />
              <span id="reviewCountText">&nbsp; {review.userReviewCount} {reviewPluralCase}</span>
            </div>
          </div>

          <div className="rightHalf" id="reviewRightHalf">

            <div id="reviewStarsDateRating">
              <div id="reviewStarsDate">
                <div id="reviewStarsContainer">
                  <img className="reviewStar" src={stars[0]} alt="Star Icon" />
                  <img className="reviewStar" src={stars[1]} alt="Star Icon" />
                  <img className="reviewStar" src={stars[2]} alt="Star Icon" />
                  <img className="reviewStar" src={stars[3]} alt="Star Icon" />
                  <img className="reviewStar" src={stars[4]} alt="Star Icon" />
                </div>
                <span className="reviewRatingDate"> Dined on {new Date(reviewDate[0], reviewDate[1] - 1, reviewDate[2].substr(0,2)).toDateString()}</span>
              </div>
              <div id="reviewRatingsContainer">
                <span className="reviewRatingCategory">Overall </span>
                <span className="reviewRatingNumber">{review.overallRating} &nbsp;</span>
                <span className="reviewRatingCategory">&#8226; Food </span>
                <span className="reviewRatingNumber">{review.foodRating} &nbsp;</span>
                <span className="reviewRatingCategory">&#8226; Service </span>
                <span className="reviewRatingNumber">{review.serviceRating} &nbsp;</span>
                <span className="reviewRatingCategory">&#8226; Ambiance </span>
                <span className="reviewRatingNumber">{review.ambianceRating}</span>
              </div>
            </div>

            <div>
              <p id="reviewText">{reviewText}</p>
            </div>

            <div id="reportHelpful">
              <div>
                <a id="readMore" href="#" onClick={(e) => this.readMoreToggle(e)}>{readMorePhrase}</a>
              </div>
              <div id="subReportHelpful">
                <div className="flexCenter" id="reportContainer" onClick={(e) => this.toggleReportModal(e)}>
                  <div id="flagIcon" />
                  <span className="reportText">Report</span>
                </div>
                <div className="flexCenter"
                  id={helpHover} 
                  value={review.is_helpful}
                  onClick={() => this.helpfulClick(review.is_helpful)} 
                  onMouseOver={() => this.setState({ hoveronHelp: true, upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redUpvote.png' })} 
                  onMouseLeave={() => {
                    this.setState({ hoveronHelp: false });
                    helpful ? this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redUpvote.png' }) : this.setState({ upvoteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/whiteUpvote.png' });
                  }}>
                  <div className="flex" >
                    <img id="upvoteIcon" src={upvoteIcon} alt="upvote Icon" />
                  </div>
                  <span className="reportText">Helpful {helpful ? '(1)' : ''}</span>
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
  review: PropTypes.shape({
    is_helpful: PropTypes.number.isRequired,
    ambianceRating: PropTypes.number.isRequired,
    serviceRating: PropTypes.number.isRequired,
    foodRating: PropTypes.number.isRequired,
    overallRating: PropTypes.number.isRequired,
    dinedDate: PropTypes.string.isRequired,
    is_recommended: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    noise: PropTypes.number.isRequired,
    reviewText: PropTypes.string.isRequired,
    userArea: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userReviewCount: PropTypes.number.isRequired,
  }).isRequired,
};
