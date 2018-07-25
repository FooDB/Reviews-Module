import React from 'react';

class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: './images/emptyBox.png',
            redIcon: './images/redBox.png',
            whiteIcon: './images/emptyBox.png',
            clicked: false,
            style: 'none'
        }
    }
    switchIcon() {
        this.state.clicked = !this.state.clicked;
        if(this.state.clicked) {
            this.setState({icon: this.state.redIcon})
        } else {
            this.setState({icon: this.state.whiteIcon});
            document.activeElement.blur();
        } 
    }
    render() {
        return (
        <span className="filterCheckBox" tabIndex="0" onClick={() => {this.switchIcon(); this.props.filterReviews(this.props.keyWord.filterKeyword)}}>
            <span><img className="filterBoxIcon" src={this.state.icon} /> </span>
            <span> {this.props.keyWord.filterKeyword}</span>
        </span>
        )
    }
}
export default FilterBox;