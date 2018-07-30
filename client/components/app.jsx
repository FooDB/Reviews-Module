import React from 'react';
import ReviewList from './ReviewList.jsx';
import ReviewSummary from './ReviewSummary.jsx';
import ReviewToolbar from './ReviewToolbar.jsx';
import Pagination from './Pagination.jsx';
import ErrorBoundary from './Error.jsx';
import axios from 'axios';
import styles from './App.css';

const getIDFromURL = () => window.location.pathname.split('/')[2]

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
      stars: [],
      currentPage: 1,
      totalPages: 1,
      restaurantInfo: [],
      filterWordsSelected: [],
      currentRestReviews: [],
      id: 1,
    };
  }

  componentDidMount() {
    const id = getIDFromURL();
    this.pullKeywordsById(id);
    this.pullMenuItemsById(id);
    this.pullDataById(id);
    this.pullRestaurantInfoById(id);
    this.setState({ id })
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

  pullDataById(id) {
    axios.get(`/restaurant/${id}/reviews`)
      .then((res) => {
        this.setState({
          reviews: res.data.slice(0, 20),
          allReviews: res.data,
          totalPages: Math.round(res.data.length / 20),
          currentRestReviews: res.data,
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

  pullRestaurantInfoById(id) {
    axios.get(`/restaurant/${id}/info`)
      .then((res) => {
        this.setState({ restaurantInfo: res.data });
      })
      .catch(err => console.error(err));
  }

  pullKeywordsById(id) {
    axios.get(`/restaurant/${id}/filterKeywords`)
      .then((res) => {
        this.setState({ keyWords: res.data });
      })
      .catch(err => console.log(err));
  }

  pullMenuItemsById(id) {
    axios.get(`/restaurant/${id}/LovedFor`)
      .then((res) => {
        this.setState({ lovedFor: res.data });
      })
      .catch(err => console.log(err));
  }

  filterReviewsByKeyword(target) {
    let { allReviews, filterWordsSelected, currentRestReviews } = this.state;
    const targetIndex = filterWordsSelected.indexOf(target)
    if (targetIndex !== -1) {
      filterWordsSelected.splice(targetIndex, 1)
      currentRestReviews = allReviews;
    } else {
      filterWordsSelected.push(target);
    }

    if (!filterWordsSelected.length) {
      this.setState({ 
        reviews: allReviews.slice(0, 20),
        currentRestReviews: allReviews,
        totalPages: Math.round(currentRestReviews.length / 20), currentPage: 1 
      });
    } else {
      let filtered = [];
      for (let i = 0; i < filterWordsSelected.length; i++) {
        filtered = currentRestReviews.filter(review => review.reviewText.includes(filterWordsSelected[i]));
        currentRestReviews = filtered;
      }
      this.setState({ reviews: filtered.slice(0, 20), currentRestReviews: filtered });
      this.setState({ totalPages: Math.round(filtered.length / 20), currentPage: 1 });
    }
  }

  filterReviewsByRating(target) {
    const { allReviews } = this.state;
    const filtered = allReviews.filter(review => review.overallRating === target);
    this.setState({ 
      reviews: filtered.slice(0, 20), 
      currentRestReviews: filtered, 
      totalPages: Math.round(filtered.length / 20),
      currentPage: 1,
    });
  }

  sortReviewsBySelect(sortMethod) {
    let { currentRestReviews, allReviews } = this.state;
    if (sortMethod === 'Highest') {
      currentRestReviews = allReviews.sort((a, b) => b.overallRating - a.overallRating);
    } else if (sortMethod === 'Lowest') {
      currentRestReviews = allReviews.sort((a, b) => a.overallRating - b.overallRating);
    } else {
      currentRestReviews = allReviews.sort((a, b) => b.dinedDate - a.dinedDate);
    }
    this.setState({ 
      reviews: currentRestReviews.slice(0, 20),
      currentRestReviews: currentRestReviews,
    });
  }

  handlePageChange(page) {
    const { currentRestReviews } = this.state;
    this.setState({
      reviews: currentRestReviews.slice((page - 1) * 20, page * 20),
      currentPage: page,
    });
  }

  scrollToTopOfFeed() {
    document.getElementById('reviewContainer').scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { reviews, allReviews, ratings, stars, lovedFor, restaurantInfo, keyWords, currentPage, totalPages, id } = this.state;

    if (!reviews.length) {
      return <h3>No data</h3>
    }

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
            id={id}
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
