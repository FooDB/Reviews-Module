import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, scrollToTopOfFeed, handlePageChange }) => {
  const nextPage = (currentPage === totalPages ? currentPage : currentPage + 1);
  const previousPage = (currentPage === 1 ? currentPage : currentPage - 1);

  const middleLeftNumber = (currentPage < 3 ? 2 : currentPage - 1);
  const middleRightNumber = (currentPage + 3 <= totalPages ? currentPage + 1 : totalPages - 1);
  let middleNumber = (currentPage < 3 ? 3 : currentPage);
  if (currentPage > totalPages - 2 && currentPage !== totalPages) {
    middleNumber = currentPage - 1;
  } else if (currentPage === totalPages) {
    middleNumber = currentPage - 2;
  }

  let selectedBubble1, selectedBubble2, selectedBubble3, selectedBubble4, selectedBubble5;
  const highlightSelectedBubble = () => {
    selectedBubble1 = (currentPage === 1 ? 'selectedBubble' : 'first');
    selectedBubble2 = (currentPage === middleLeftNumber ? 'selectedBubble' : 'middleLeft');
    selectedBubble3 = (currentPage === middleNumber ? 'selectedBubble' : 'middle');
    selectedBubble4 = (currentPage === middleRightNumber ? 'selectedBubble' : 'middleRight');
    selectedBubble5 = (currentPage === totalPages ? 'selectedBubble' : 'last');
  };
  highlightSelectedBubble();

  const firstEllipsis = (currentPage - 3 > 0
    ? <span className="ellipsisBubble" id="firstEllipsis">&middot;&middot;&middot;</span>
    : '');
  const secondEllipsis = (currentPage + 3 <= totalPages
    ? <span className="ellipsisBubble" id="secondEllipsis">&middot;&middot;&middot;</span>
    : '');
  const middleRightBubble = (2 < currentPage && currentPage <= totalPages
    ? <span className="paginationBubble" id={selectedBubble4} onClick={() => {handlePageChange(middleRightNumber); scrollToTopOfFeed();}}>{middleRightNumber}</span>
    : '');
  const middleLeftBubble = (currentPage < totalPages - 1
    ? <span className="paginationBubble" id={selectedBubble2} onClick={() => {handlePageChange(middleLeftNumber); scrollToTopOfFeed();}}>{middleLeftNumber}</span>
    : '');

  return (
    <div id="paginationContainer">
      <span className="paginationArrow" onClick={() => {handlePageChange(previousPage); scrollToTopOfFeed();}}>{'<'}</span>

      <span>
        <span className="paginationBubble" id={selectedBubble1} onClick={() => {handlePageChange(1); scrollToTopOfFeed();}}>1</span>
        {firstEllipsis}
        {middleLeftBubble}
        <span className="paginationBubble" id={selectedBubble3} onClick={() => {handlePageChange(middleNumber); scrollToTopOfFeed();}}>{middleNumber}</span>
        {middleRightBubble}
        {secondEllipsis}
        <span className="paginationBubble" id={selectedBubble5} onClick={() => {handlePageChange(totalPages); scrollToTopOfFeed();}}>{totalPages}</span>
      </span>

      <span className="paginationArrow" onClick={() => {handlePageChange(nextPage); scrollToTopOfFeed();}}>{'>'}</span>
    </div>
  );
};
export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  scrollToTopOfFeed: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};
