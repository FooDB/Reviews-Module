import React from 'react';
import ReviewList from './ReviewList.jsx';
import ReviewSummary from './ReviewSummary.jsx';
import ReviewToolbar from './ReviewToolbar.jsx';
import Pagination from './Pagination.jsx';
import ErrorBoundary from './Error.jsx';
import axios from 'axios';
import styles from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      allReviews: [],
      keyWords: [],
      lovedFor: [],
      ratings: {
        totalAverage: 0,
        foodAverage: 0,
        serviceAverage: 0,
        ambianceAverage: 0,
        valueAverage: 0,
        noise: 0,
        recommended: 0,
      },
      is_filtered: false,
      stars: [],
      currentPage: 1,
      totalPages: 0,
      restaurantInfo: [],
    };
  }

  componentDidMount() {
    this.pullKeywordsById();
    this.pullMenuItemsById();
    this.pullDataById();
    this.pullRestaurantInfoById();
  }

  getAverage(reviews, criteria) {
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
      sum += reviews[i][criteria];
    }
    return Number.parseFloat(sum / reviews.length).toFixed(1);
  }

  setDynamicStarRating() {
    const { ratings, stars } = this.state;
    let totalAverageCopy = ratings.totalAverage;
    let starsToGo = false;
    for (let i = 0; i < 5; i++) {
      if (totalAverageCopy - 1 < 0 && !starsToGo) {
        totalAverageCopy > .5 ? stars.push('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/highStar.png') : stars.push('https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/lowStar.png');
        totalAverageCopy--;
        starsToGo = true;
      } else {
        totalAverageCopy > 0 ? stars.push("https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redStar.png") : stars.push("https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/greyStar.png");
        totalAverageCopy--;
      }
    }
    this.setState({ stars });
  }

  pullDataById() {
    axios.get(`/reviews/${3}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          reviews: res.data.slice(0, 20),
          allReviews: res.data,
          totalPages: Math.floor(res.data.length / 20),
        });
        this.setState({
          ratings: {
            totalAverage: this.getAverage(res.data, 'overallRating'),
            foodAverage: this.getAverage(res.data, 'foodRating'),
            serviceAverage: this.getAverage(res.data, 'serviceRating'),
            ambianceAverage: this.getAverage(res.data, 'ambianceRating'),
            valueAverage: this.getAverage(res.data, 'valueRating'),
            noise: this.getAverage(res.data, 'noise'),
            recommended: Math.round((this.getAverage(res.data, 'is_recommended')) * 100),
          },
        }, () => this.setDynamicStarRating());
      })
      .catch(err => console.log(err));
  }

  pullRestaurantInfoById() {
    axios.get(`/restaurantInfo/${3}`)
      .then((res) => {
        this.setState({ restaurantInfo: res.data });
        console.log(res.data, 'restaurantInfo');
      })
      .catch(err => console.error(err));
  }

  pullKeywordsById() {
    axios.get(`/filterKeywords/${3}`)
      .then((res) => {
        this.setState({ keyWords: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  pullMenuItemsById() {
    axios.get(`/LovedFor/${3}`)
      .then((res) => {
        this.setState({ lovedFor: res.data });
        console.log(res.data, 'lovedfordata');
      })
      .catch(err => console.log(err));
  }

  filterReviewsByKeyword(target) {
    const { is_filtered, reviews, allReviews } = this.state;
    if (!is_filtered) {
      const filtered = reviews.filter(review => review.reviewText.includes(target));
      this.setState({ reviews: filtered });
    } else {
      this.setState({ reviews: allReviews });
    }
    this.setState({ is_filtered: !is_filtered });
    console.log('filter reviews called', target);
  }

  filterReviewsByRating(target) {
    const { allReviews } = this.state;
    const filtered = allReviews.filter(review => review.overallRating === target);
    this.setState({ reviews: filtered });
  }

  sortReviewsBySelect(sortMethod) {
    const { reviews } = this.state;
    if (sortMethod === 'Highest') {
      reviews.sort((a, b) => b.overallRating - a.overallRating);
    } else if (sortMethod === 'Lowest') {
      reviews.sort((a, b) => a.overallRating - b.overallRating);
    } else {
      reviews.sort((a, b) => b.dinedDate - a.dinedDate);
    }
    this.setState({ reviews });
  }

  handlePageChange(page) {
    const { allReviews } = this.state;
    this.setState({
      reviews: allReviews.slice((page - 1) * 20, page * 20),
      currentPage: page,
    });
  }

  scrollToTopOfFeed() {
    document.getElementById('reviewContainer').scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { reviews, allReviews, ratings, stars, lovedFor, restaurantInfo, keyWords, currentPage, totalPages } = this.state;
    return (
      <div id="appMasterContainer">
        <ErrorBoundary>
          <ReviewSummary
            reviews={reviews}
            allReviews={allReviews}
            ratings={ratings}
            stars={stars}
            lovedFor={lovedFor}
            filter={this.filterReviewsByRating.bind(this)}
            scrollToTopOfFeed={this.scrollToTopOfFeed.bind(this)}
            restaurantInfo={restaurantInfo}
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <ReviewToolbar
            keyWords={keyWords}
            sortReviews={this.sortReviewsBySelect.bind(this)}
            filterReviews={this.filterReviewsByKeyword.bind(this)}
            scrollToTopOfFeed={this.scrollToTopOfFeed.bind(this)}
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <ReviewList
            reviews={reviews}
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <Pagination
            reviews={allReviews}
            handlePageChange={this.handlePageChange.bind(this)}
            currentPage={currentPage}
            totalPages={totalPages}
            scrollToTopOfFeed={this.scrollToTopOfFeed.bind(this)}
          />
        </ErrorBoundary>
      </div>
    );
  }
}
export default App;
