class App extends React.Component {
    constructor(props) {
        super(props)
    }
    insertData() {
        console.log('insertdata called');
        axios.get('/insertData').then(res => console.log(res))
    }
    render() {
        return (
            <button onClick={() => this.insertData()}>insertData</button>
        )
    }
}
export default App;