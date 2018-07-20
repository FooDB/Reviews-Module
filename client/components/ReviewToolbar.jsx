import FilterBox from './FilterBox.jsx';

class ReviewToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div id="toolbarContainer">
                <div id="toolbarSortText">Sort By</div>
                <div id="sortSelection">
                    <select id="sortMethod" onChange={() => this.props.sortReviews()}>
                        <option value="Newest"><strong>Newest</strong></option>
                        <option value="Highest">Highest Rating</option>
                        <option value="Lowest">Lowest Rating</option>
                    </select>
                </div>
                <div id="filtersHeader">Filters</div>
                <div>
                    {this.props.keyWords.map(keyWord => <FilterBox keyWord={keyWord} key={keyWord.id} filterReviews={this.props.filterReviews}/>)}
                </div>
            </div>
        )
    }
}
export default ReviewToolbar;