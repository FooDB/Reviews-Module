class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
        <span>
            <input type="checkbox" />
            <label>
                <span>{this.props.keyWord.filterKeyword}</span>
            </label>
        </span>
        )
    }
}
export default FilterBox;