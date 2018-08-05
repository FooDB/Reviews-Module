import React from 'react';
import PropTypes from 'prop-types';
import styles from './RatingBar.css';

const RatingBar = ({ i, filter, scrollToTopOfFeed, percentages }) => (
    <div className="toolbarAndNumber" onClick={() => {filter(5 - i); scrollToTopOfFeed();}}>
    <span className="toolbarNumber">{5 - i}</span>
    <div className="toolbar-light-background">
      <div className="toolbar-red" style={{ width: percentages[4 - i] }} key={percentages[4 - i]} />
    </div>
  </div>
)

export default RatingBar;

RatingBar.propTypes = {
    filter: PropTypes.func.isRequired,
    scrollToTopOfFeed: PropTypes.func.isRequired,
    percentages: PropTypes.array.isRequired,
    i: PropTypes.number.isRequired,
};