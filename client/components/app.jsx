import React from 'react';
import ReviewList from './ReviewList.jsx';
import ReviewSummary from './ReviewSummary.jsx';
import ReviewToolbar from './ReviewToolbar.jsx';
import Pagination from './Pagination.jsx';
import ErrorBoundary from './Error.jsx';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            allReviews: [],
            filteredReviews: [],
            keyWords: [],
            lovedFor: [],
            ratings: {
                totalAverage: 0,
                foodAverage: 0,
                serviceAverage: 0,
                ambianceAverage: 0,
                valueAverage: 0,
                noise: 0,
                recommended: 0
            },
            is_filtered: false,
            stars: [],
            currentPage: 1,
            totalPages: 0
        }
    }
    componentDidMount() {
        this.pullKeywordsById();
        this.pullMenuItemsById();
        this.pullDataById();
    }
    getAverage(reviews, criteria) {
        let sum = 0;
        for (let i = 0; i < reviews.length; i++) {
            sum += reviews[i][criteria]
        }
        return Number.parseFloat(sum / reviews.length).toFixed(1);
    }
    pullDataById() {
        console.log('pulled data called');
        axios.get(`/reviews/${3}`)
        .then(res => {
            this.setState({
                reviews: res.data.slice(0,20),
                allReviews: res.data,
                totalPages: Math.floor(res.data.length / 20)
            })
            console.log(res.data);
            this.setState({
                ratings : {
                    totalAverage: this.getAverage(res.data, 'overallRating'),
                    foodAverage: this.getAverage(res.data, 'foodRating'),
                    serviceAverage: this.getAverage(res.data, 'serviceRating'),
                    ambianceAverage: this.getAverage(res.data, 'ambianceRating'),
                    valueAverage: this.getAverage(res.data, 'valueRating'),
                    noise: this.getAverage(res.data, 'noise'),
                    recommended: Math.round((this.getAverage(res.data, 'is_recommended')) * 100)
                }
            }, () => {
                let totalAverageCopy = this.state.ratings.totalAverage
                let starsToGo = false;
                for (let i = 0; i < 5; i++) {
                    if (totalAverageCopy - 1 < 0 && !starsToGo) {
                        totalAverageCopy > .5 ? this.state.stars.push('./images/highStar.png') : this.state.stars.push('./images/lowStar');
                        totalAverageCopy--;
                        starsToGo = true
                        continue;
                    } else {
                        totalAverageCopy > 0 ? this.state.stars.push("./images/redStar.png") : this.state.stars.push("./images/greyStar.png");
                        totalAverageCopy--;
                    }
                }
                this.setState({stars: this.state.stars})
            })
        })
        .catch(err => console.log(err));
    }
    pullKeywordsById() {
        axios.get(`/filterKeywords/${3}`)
        .then(res => {
            this.setState({keyWords: res.data})
            console.log(res.data);
        })
        .catch(err => console.log(err));   
    }
    pullMenuItemsById() {
        axios.get(`/LovedFor/${3}`)
        .then(res => {
            this.setState({lovedFor: res.data})
            console.log(res.data, 'lovedfordata');
        })
        .catch(err => console.log(err));    
    }
    filterReviewsByKeyword(target) {
        if (!this.state.is_filtered) {
            let filtered = this.state.reviews.filter((review) => review.reviewText.includes(target))
            this.setState({reviews: filtered, is_filtered: !this.state.is_filtered});
        } else {
            this.setState({reviews: this.state.allReviews});
            this.setState({is_filtered: !this.state.is_filtered})
        }
        console.log('filter reviews called', target);
    }
    filterReviewsByRating(target) {
        let filtered = this.state.allReviews.filter((review) => review.overallRating === target);
        this.setState({reviews: filtered});
    }
    sortReviewsBySelect() {
        const sortMethod = document.getElementById('sortMethod').value;
        if (sortMethod === 'Highest') {
            this.state.reviews.sort((a, b) => b.overallRating - a.overallRating)
        } else if (sortMethod === 'Lowest') {
            this.state.reviews.sort((a, b) => a.overallRating - b.overallRating)
        } else {
            this.state.reviews.sort((a, b) => b.dinedDate - a.dinedDate)
        }
        this.setState({reviews: this.state.reviews})
    }
    handlePageChange(page) {
        this.setState({
            reviews: this.state.allReviews.slice((page - 1) * 20, page * 20),
            currentPage: page
        })
    }
    scrollToTopOfFeed() {
        let scrollContainer = document.getElementById('paginationContainer');
        let target = document.getElementById('toolbarContainer');
        while (scrollContainer.scrollTop === 0) {
            if (!scrollContainer) return;
            scrollContainer = scrollContainer.parentNode;
            scrollContainer.scrollTop += 1;
        }
    
        let targetY = 0;
        while (target !== scrollContainer) {
            targetY += target.offsetTop;
            target = target.offsetParent
        }
    
        scroll = (c, a, b, i) => {
            i++;
            if (i > 30) return;
            c.scrollTop = a + (b - a) / 30 * i;
            setTimeout(() => {
                scroll(c, a, b, i); 
            }, 12);
        }
        scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    }
    render() {
        return (
            <div id="appMasterContainer">

                <ErrorBoundary>
                    <ReviewSummary 
                        reviews={this.state.reviews}
                        allReviews={this.state.allReviews} 
                        ratings={this.state.ratings} 
                        stars={this.state.stars}
                        lovedFor={this.state.lovedFor}
                        filter={this.filterReviewsByRating.bind(this)}
                        scrollToTopOfFeed={this.scrollToTopOfFeed.bind(this)}/>
                </ErrorBoundary>

                <ErrorBoundary>
                    <ReviewToolbar 
                        keyWords={this.state.keyWords} 
                        sortReviews={this.sortReviewsBySelect.bind(this)}
                        filterReviews={this.filterReviewsByKeyword.bind(this)}/>
                </ErrorBoundary>

                <ErrorBoundary>
                    <ReviewList 
                        reviews={this.state.reviews}/>  
                </ErrorBoundary>

                <ErrorBoundary> 
                    <Pagination 
                        reviews={this.state.allReviews}
                        handlePageChange={this.handlePageChange.bind(this)}
                        currentPage={this.state.currentPage}
                        totalPages={this.state.totalPages}
                        scrollToTopOfFeed={this.scrollToTopOfFeed.bind(this)}/>
                </ErrorBoundary>
            </div>
        )
    }
}
export default App;