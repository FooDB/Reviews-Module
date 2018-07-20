class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
        <span onClick={() => this.props.filterReviews(this.props.keyWord.filterKeyword)} >
            <input type="checkbox" />
            <label>
                <span>{this.props.keyWord.filterKeyword}</span>
            </label>
        </span>
        )
    }
}
export default FilterBox;