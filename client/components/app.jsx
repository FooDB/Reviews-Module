var faker = require('faker');

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    insertData() {
        console.log('insertdata not called but clicked');
        // axios.get('/insertData').then(res => console.log(res))
    }
    pullDataById() {
        console.log('pulled data called');
        axios.get(`/pullData/${1}`).then(res => console.log(res));
    }
    render() {
        return (
            <div>
                <button onClick={() => this.insertData()}>insertData</button>
                <button onClick={() => this.pullDataById()}>GetData</button>               
            </div>
        )
    }
}
export default App;