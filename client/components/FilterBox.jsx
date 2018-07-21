import React from 'react';

class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: './images/emptyBox.png',
            redIcon: './images/redBox.png',
            whiteIcon: './images/emptyBox.png',
            clicked: false
        }
    }
    switchIcon() {
        this.state.clicked = !this.state.clicked;
        this.state.clicked ? this.setState({icon: this.state.redIcon}) : this.setState({icon: this.state.whiteIcon});
    }
    render() {
        return (
        <span className="filterCheckBox" onClick={() => {this.switchIcon(); this.props.filterReviews(this.props.keyWord.filterKeyword)}}>
            <span><img className="star" src={this.state.icon} /> </span>
            <span> {this.props.keyWord.filterKeyword}</span>
        </span>
        )
    }
}
export default FilterBox;