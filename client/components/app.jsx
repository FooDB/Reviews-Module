import ReviewList from './ReviewList.jsx';
import ReviewSummary from './ReviewSummary.jsx';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: []
        }
    }
    componentDidMount() {
        this.pullDataById()
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
    render() {
        return (
            <div>
                <ReviewSummary reviews={this.state.reviews}/>
                <ReviewList reviews={this.state.reviews}/>   
            </div>
        )
    }
}
export default App;