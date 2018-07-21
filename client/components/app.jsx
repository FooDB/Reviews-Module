import ReviewList from './ReviewList.jsx';
import '../../public/styles.css';
import ReviewSummary from './ReviewSummary.jsx';
import ReviewToolbar from './ReviewToolbar.jsx';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            allReviews: [],
            filteredReviews: [],
            keyWords: [],
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
            stars: []
        }
    }
    componentWillMount() {
        this.pullDataById()
        this.pullKeywordsById()
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
                reviews: res.data,
                allReviews: res.data
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
    filterReviews(target) {
        if (!this.state.is_filtered) {
            let filtered = this.state.reviews.filter((x) => x.reviewText.includes(target))
            this.setState({reviews: filtered, is_filtered: !this.state.is_filtered});
        } else {
            this.setState({reviews: this.state.allReviews});
            this.setState({is_filtered: !this.state.is_filtered})
        }
        console.log('filter reviews called', target);
    }
    sortReviewsBySelect() {
        let sortMethod = document.getElementById('sortMethod').value;
        if (sortMethod === 'Highest') {
            this.state.reviews.sort((a, b) => b.overallRating - a.overallRating)
        } else if (sortMethod === 'Lowest') {
            this.state.reviews.sort((a, b) => a.overallRating - b.overallRating)
        } else {
            this.state.reviews.sort((a, b) => b.dinedDate - a.dinedDate)
        }
        this.setState({reviews: this.state.reviews})
    }
    render() {
        return (
            <div id="appMasterContainer">
                <ReviewSummary reviews={this.state.reviews} ratings={this.state.ratings} stars={this.state.stars}/>
                <ReviewToolbar keyWords={this.state.keyWords} 
                sortReviews={this.sortReviewsBySelect.bind(this)}
                filterReviews={this.filterReviews.bind(this)}
                stars={this.state.stars}/>
                <ReviewList reviews={this.state.reviews}/>   
            </div>
        )
    }
}
export default App;