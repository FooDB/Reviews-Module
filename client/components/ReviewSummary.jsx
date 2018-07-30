import React from 'react';
import PropTypes from 'prop-types';
import LovedForBox from './LovedForBox.jsx';
import axios from 'axios';
import styles from './ReviewSummary.css';

class ReviewSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentages: Array(5).fill('0%'),
    };
  }

  componentDidMount() {
    let { allReviews } = this.state;
    axios.get(`/restaurant/${this.props.id}/reviews`)
      .then((res) => {
        allReviews = res.data
        let fiveStarCount = 0, fourStarCount = 0, threeStarCount = 0, twoStarCount = 0, oneStarCount = 0;
        for (let i = 0; i < allReviews.length; i++) {
          let r = allReviews[i].overallRating;
          if (r === 1) oneStarCount++;
          if (r === 2) twoStarCount++;
          if (r === 3) threeStarCount++;
          if (r === 4) fourStarCount++;
          if (r === 5) fiveStarCount++;
        }
        const counts = [fiveStarCount, fourStarCount, threeStarCount, twoStarCount, oneStarCount]
        this.setState({ percentages: counts.map(count => Math.round(count / allReviews.length * 100) + '%') })
      })
      .catch(err => console.log(err));
  }

  render() {
    const { ratings, allReviews, stars, restaurantInfo, filter, lovedFor, scrollToTopOfFeed } = this.props;
    const { percentages } = this.state;
    let noiseLevel;
    if (ratings.noise > 1) {
      noiseLevel = 'Loud';
    } else if (ratings.noise < 1 && ratings.noise > 0) {
      noiseLevel = 'Moderate';
    } else {
      noiseLevel = 'Quiet';
    }
    const starSource = (stars ? stars : Array(5).fill(''));
    const restaurantArea = (restaurantInfo[0] ? restaurantInfo[0].restaurantArea : '');
    return (
      <div id="reviewSummaryContainer">
        <div className="summaryHeader">What {allReviews.length} People Are Saying</div>
        <div>

          <div id="leftSummaryContainer">
            <div className="summarySubHeader"><strong>Overall ratings and reviews</strong></div>
            <div id="reviewConditional">Reviews can only be made by diners who have eaten at this restaurant</div>
            <div>
              <div className="summaryStarRating">
                <span><img className="summaryStarIcon" src={starSource[0]} alt="Star Icon" /></span>
                <span><img className="summaryStarIcon" src={starSource[1]} alt="Star Icon" /></span>
                <span><img className="summaryStarIcon" src={starSource[2]} alt="Star Icon" /></span>
                <span><img className="summaryStarIcon" src={starSource[3]} alt="Star Icon" /></span>
                <span><img className="summaryStarIcon" src={starSource[4]} alt="Star Icon" /></span>
              </div>
              <div className="summaryStarRating" id="summaryStarText">
                <span> &nbsp; {ratings.totalAverage}</span>
                <span> Based on Recent Ratings</span>
              </div>
            </div>
            <div>
              <div className="summaryRating" id="summaryFirstRating">
                <div><strong>{ratings.foodAverage}</strong></div>
                <div>Food</div>
              </div>
              <div className="summaryRating">
                <div><strong>{ratings.serviceAverage}</strong></div>
                <div>Service</div>
              </div>
              <div className="summaryRating">
                <div><strong>{ratings.ambianceAverage}</strong></div>
                <div>Ambiance</div>
              </div>
              <div className="summaryRating">
                <div><strong>{ratings.valueAverage}</strong></div>
                <div>Value</div>
              </div>
            </div>
            <div className="summarySpacingContainer">
              <div className="inlineBlock">
                <span><img className="summaryIcon" id="summaryBarIcon" src="https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/risingBars.png" alt="bar icon" /></span>
                <span id="summaryNoiseText"><strong>Noise &#8226;</strong><span id="summaryNoiseLevel"> {noiseLevel}</span></span>
              </div>
            </div>
            <div className="summarySpacingContainer">
              <div className="inlineBlock">
                <span><img className="summaryIcon" id="thumbsUpIcon" src="https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/thumbsUp.png" alt="thumbsUp icon" /></span>
                <span id="recommendedText"><strong>{ratings.recommended}% of people</strong> <span>would recommend it to a friend</span></span>
              </div>
            </div>
          </div>

          <div id="summaryToolbarContainer">
            <div>
              <div className="toolbarAndNumber" onClick={() => {filter(5); scrollToTopOfFeed()}}>
                <span className="toolbarNumber">5</span>
                <div className="toolbar-light-background">
                  <div className="toolbar-red" style={{ width: percentages[4] }} />
                </div>
              </div>
              <div className="toolbarAndNumber" onClick={() => {filter(4); scrollToTopOfFeed()}}>
                <span className="toolbarNumber">4</span>
                <div className="toolbar-light-background">
                  <div className="toolbar-red" style={{ width: percentages[3] }} />
                </div>
              </div>
              <div className="toolbarAndNumber" onClick={() => {filter(3); scrollToTopOfFeed()}}>
                <span className="toolbarNumber">3</span>
                <div className="toolbar-light-background">
                  <div className="toolbar-red" style={{ width: percentages[2] }} />
                </div>
              </div>
              <div className="toolbarAndNumber" onClick={() => {filter(2); scrollToTopOfFeed()}}>
                <span className="toolbarNumber">2</span>
                <div className="toolbar-light-background">
                  <div className="toolbar-red" style={{ width: percentages[1] }} />
                </div>
              </div>
              <div className="toolbarAndNumber" onClick={() => {filter(1); scrollToTopOfFeed()}}>
                <span className="toolbarNumber">1</span>
                <div className="toolbar-light-background">
                  <div className="toolbar-red" style={{ width: percentages[0] }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="lovedForContainer">
          <div>
            <div id="lovedForText">
              Loved For <a href="#"><img className="summaryIcon" src="https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/infoIcon.png" /></a>
            </div>
            <div>
              {lovedFor.map(item => <LovedForBox lovedFor={item} key={item.id} />)}
            </div>
          </div>
        </div>

        <div>
          <a id="BestRestaurantsLink" href="#">Best Restaurants in {restaurantArea}</a>
        </div>
      </div>
    );
  }
}

export default ReviewSummary;

ReviewSummary.propTypes = {
  lovedFor: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired,
  scrollToTopOfFeed: PropTypes.func.isRequired,
  allReviews: PropTypes.array.isRequired,
  restaurantInfo: PropTypes.array.isRequired,
  stars: PropTypes.array.isRequired,
  ratings: PropTypes.object.isRequired,
};
