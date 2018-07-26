import React from 'react';
import PropTypes from 'prop-types';
import FilterBox from './FilterBox.jsx';
import styles from './ReviewToolbar.css';

class ReviewToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ddSelected: false,
      display: 'none',
      current: 'Newest',
      arrow: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/downArrow.png'
    };
  }

  handleSelection(e) {
    const { ddSelected } = this.state;
    const { scrollToTopOfFeed } = this.props;
    this.setState({ ddSelected: !ddSelected });
    e.target.textContent ? this.setState({ current: e.target.textContent }) : null;
    if (!ddSelected) {
      this.setState({ display: 'block' });
      this.setState({ arrow: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/upArrow.png' });
    } else {
      this.setState({ display: 'none' });
      this.setState({ arrow: 'https://s3-us-west-1.amazonaws.com/review-photos-fec-open-table/downArrow.png' });
      scrollToTopOfFeed();
    }
  }

  render() {
    const { current, arrow, display } = this.state;
    const { sortReviews, keyWords, filterReviews } = this.props;
    return (
      <div id="toolbarContainer">
        <div id="toolbarSortText">Sort By</div>

        <div id="dropdownHeader" onClick={(e) => this.handleSelection(e)}>
          <span>{current}</span>
          <span><img className="star" src={arrow} /></span>
        </div>
        <div className="dropdownContainer" style={{ display: display }}>
          <div className="dropdownItem" value="Newest" onClick={(e) => {sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e);}} >
            <svg id="Capa_1" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 430.602 430.602" >
              <g>
                <path d="M215.301,60c41.482,0,80.481,16.154,109.814,45.486c29.332,29.332,45.485,68.332,45.485,109.814
                                c0,41.481-16.153,80.481-45.485,109.813c-29.333,29.332-68.332,45.486-109.814,45.486c-41.482,0-80.481-16.154-109.814-45.486
                                C76.155,295.781,60.001,256.781,60.001,215.3c0-41.482,16.154-80.482,45.486-109.814C134.82,76.155,173.819,60,215.301,60
                                M215.301,0C96.394,0,0,96.394,0,215.301s96.394,215.301,215.301,215.301s215.301-96.394,215.301-215.301S334.208,0,215.301,0
                                L215.301,0z"
                />
              </g>
            </svg>
            <span className="dropdownText">Newest</span>
          </div>
          <div className="dropdownItem" value="Highest"onClick={(e) => {sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e);}} >
            <svg id="Capa_1" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 430.602 430.602" >
              <g>
                <path d="M215.301,60c41.482,0,80.481,16.154,109.814,45.486c29.332,29.332,45.485,68.332,45.485,109.814
                                c0,41.481-16.153,80.481-45.485,109.813c-29.333,29.332-68.332,45.486-109.814,45.486c-41.482,0-80.481-16.154-109.814-45.486
                                C76.155,295.781,60.001,256.781,60.001,215.3c0-41.482,16.154-80.482,45.486-109.814C134.82,76.155,173.819,60,215.301,60
                                M215.301,0C96.394,0,0,96.394,0,215.301s96.394,215.301,215.301,215.301s215.301-96.394,215.301-215.301S334.208,0,215.301,0
                                L215.301,0z"
                />
              </g>
            </svg>
            <span className="dropdownText">Highest Rating</span>
          </div>
          <div className="dropdownItem" value="Lowest" onClick={(e) => {sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e);}} >
            <svg id="Capa_1" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 430.602 430.602" >
              <g>
                <path d="M215.301,60c41.482,0,80.481,16.154,109.814,45.486c29.332,29.332,45.485,68.332,45.485,109.814
                                c0,41.481-16.153,80.481-45.485,109.813c-29.333,29.332-68.332,45.486-109.814,45.486c-41.482,0-80.481-16.154-109.814-45.486
                                C76.155,295.781,60.001,256.781,60.001,215.3c0-41.482,16.154-80.482,45.486-109.814C134.82,76.155,173.819,60,215.301,60
                                M215.301,0C96.394,0,0,96.394,0,215.301s96.394,215.301,215.301,215.301s215.301-96.394,215.301-215.301S334.208,0,215.301,0
                                L215.301,0z"
                />
              </g>
            </svg>
            <span className="dropdownText">Lowest Rating</span>
          </div>
        </div>

        <div id="filtersHeader">Filters</div>
        <div>
          {keyWords.map(keyWord => <FilterBox keyWord={keyWord} key={keyWord.id} filterReviews={filterReviews}/>)}
        </div>
      </div>
    );
  }
}
export default ReviewToolbar;

ReviewToolbar.propTypes = {
  keyWords: PropTypes.array.isRequired,
  sortReviews: PropTypes.func.isRequired,
  filterReviews: PropTypes.func.isRequired,
  scrollToTopOfFeed: PropTypes.func.isRequired,
};
