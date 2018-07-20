class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: './images/emptyBox.png',
            redIcon: './images/redBox.png'
        }
    }
    render() {
        return (
        // <span className="filterCheckBox" onClick={() => this.props.filterReviews(this.props.keyWord.filterKeyword)} >
        //     <input type="checkbox" />
        //     <label>
        //         <span>{this.props.keyWord.filterKeyword}</span>
        //     </label>
        // </span>
        <span className="filterCheckBox" onClick={() => this.props.filterReviews(this.props.keyWord.filterKeyword)}>
            <span><img className="star" src={this.state.icon} /> </span>
            <span> {this.props.keyWord.filterKeyword}</span>
        </span>
        // <button className="filterCheckBox" onClick={() => this.props.filterReviews(this.props.keyWord.filterKeyword)}>{this.props.keyWord.filterKeyword}</button>
        )
    }
}
export default FilterBox;