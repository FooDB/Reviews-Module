import ReviewList from './ReviewList.jsx';
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
            is_filtered: false
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
            })
        })
        .catch(err => console.log(err));
    }
    pullKeywordsById() {
        console.log('pulled keywords called');
        axios.get(`/filterKeywords/${3}`)
        .then(res => {
            this.setState({keyWords: res.data})
            console.log(res.data);
        })
        .catch(err => console.log(err));      
    }
    filterReviews(target) {
        if (!this.state.is_filtered) {
            console.log('filter reviews called', target);
            let filtered = this.state.reviews.filter((x) => x.reviewText.includes(target))
            this.setState({reviews: filtered, is_filtered: !this.state.is_filtered});
        } else {
            this.setState({reviews: this.state.allReviews});
        }
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
            <div>
                <ReviewSummary reviews={this.state.reviews} ratings={this.state.ratings}/>
                <ReviewToolbar keyWords={this.state.keyWords} 
                sortReviews={this.sortReviewsBySelect.bind(this)}
                filterReviews={this.filterReviews.bind(this)}/>
                <ReviewList reviews={this.state.reviews}/>   
            </div>
        )
    }
}
export default App;