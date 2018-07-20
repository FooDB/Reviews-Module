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
            keyWords: []
        }
    }
    componentDidMount() {
        this.pullDataById()
        this.pullKeywordsById()
    }
    pullDataById() {
        console.log('pulled data called');
        axios.get(`/reviews/${3}`)
        .then(res => {
            this.setState({reviews: res.data})
            console.log(res.data);
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
    render() {
        return (
            <div>
                <ReviewSummary reviews={this.state.reviews}/>
                <ReviewToolbar keyWords={this.state.keyWords}/>
                <ReviewList reviews={this.state.reviews}/>   
            </div>
        )
    }
}
export default App;