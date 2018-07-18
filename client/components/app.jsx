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
    insertData() {
        console.log('insertdata not called but clicked');
        // axios.get('/insertData').then(res => console.log(res))
    }
    pullDataById() {
        console.log('pulled data called');
        axios.get(`/pullData/${1}`).then(res => {
            this.setState({reviews: res.data})
            console.log(res.data);
        });
    }
    render() {
        return (
            <div>
                {/* <button onClick={() => this.insertData()}>insertData</button> */}
                {/* <button onClick={() => this.pullDataById()}>GetData</button>    */}
                <ReviewSummary reviews={this.state.reviews}/>
                <ReviewList reviews={this.state.reviews}/>   
            </div>
        )
    }
}
export default App;