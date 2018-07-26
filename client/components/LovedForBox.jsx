import React from 'react';
import PropTypes from 'prop-types';
import styles from './LovedForBox.css';

const LovedForBox = ({ lovedFor }) => (
  <a>
    <span className="lovedForBox">
      <span>
        <img className="lovedForIcon" src="https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/trophy.png" alt="trophy"/>
      </span>
      <span id="menuItem">{lovedFor.menuItem} </span>
    </span>
  </a>
);
export default LovedForBox;

LovedForBox.propTypes = {
  lovedFor: PropTypes.shape({
    menuItem: PropTypes.string.isRequired,
  }),
};
