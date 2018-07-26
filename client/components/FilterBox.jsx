import React from 'react';
import PropTypes from 'prop-types';

class FilterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/emptyBox.png',
      redIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/redBox.png',
      whiteIcon: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/emptyBox.png',
      clicked: false,
    };
  }

  switchIcon() {
    this.state.clicked = !this.state.clicked;
    if(this.state.clicked) {
      this.setState({ icon: this.state.redIcon });
    } else {
      this.setState({ icon: this.state.whiteIcon });
      document.activeElement.blur();
    }
  }

  render() {
    return (
      <span className="filterCheckBox" tabIndex="0" onClick={() => {this.switchIcon(); this.props.filterReviews(this.props.keyWord.filterKeyword);}}>
        <span>
          <img className="filterBoxIcon" src={this.state.icon} alt="Box Icon" />
        </span>
        <span> {this.props.keyWord.filterKeyword}</span>
      </span>
    );
  }
}
export default FilterBox;

FilterBox.propTypes = {
  keyWord: PropTypes.shape({
    filterKeyword: PropTypes.string.isRequired,
  }),
  filterReviews: PropTypes.func.isRequired,
};
