import FilterBox from './FilterBox.jsx';

class ReviewToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <div>Sort By</div>
                <div>
                    <select id="sortMethod" onChange={() => this.props.sortReviews()}>
                        <option value="Newest">Newest</option>
                        <option value="Highest">Highest Rating</option>
                        <option value="Lowest">Lowest Rating</option>
                    </select>
                </div>
                <div>Filters</div>
                <div>
                    {this.props.keyWords.map(keyWord => <FilterBox keyWord={keyWord} key={keyWord.id}/>)}
                </div>
            </div>
        )
    }
}
export default ReviewToolbar;