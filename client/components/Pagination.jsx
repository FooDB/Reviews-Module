import React from 'react';

const Pagination = (props) => {
  const nextPage = (props.currentPage === props.totalPages ? props.currentPage : props.currentPage + 1);
  const previousPage = (props.currentPage === 1 ? props.currentPage : props.currentPage - 1);

  const middleLeftNumber = (props.currentPage < 3 ? 2 : props.currentPage - 1);
  const middleRightBubbleNumber = (props.currentPage + 3 <= props.totalPages ? props.currentPage + 1 : props.totalPages - 1);
  let middleBubbleNumber = (props.currentPage < 3 ? 3 : props.currentPage);
  if (props.currentPage > props.totalPages - 2 && props.currentPage !== props.totalPages) {
    middleBubbleNumber = props.currentPage - 1;
  } else if (props.currentPage === props.totalPages) {
    middleBubbleNumber = props.currentPage - 2;
  }

  let selectedBubble1, selectedBubble2, selectedBubble3, selectedBubble4, selectedBubble5;
  const highlightSelectedBubble = () => {
    selectedBubble1 = (props.currentPage === 1 ? 'selectedBubble' : 'first');
    selectedBubble2 = (props.currentPage === middleLeftNumber ? 'selectedBubble' : 'middleLeft');
    selectedBubble3 = (props.currentPage === middleBubbleNumber ? 'selectedBubble' : 'middle');
    selectedBubble4 = (props.currentPage === middleRightBubbleNumber ? 'selectedBubble' : 'middleRight');
    selectedBubble5 = (props.currentPage === props.totalPages ? 'selectedBubble' : 'last');
  };
  highlightSelectedBubble();

  const firstEllipsis = (props.currentPage - 3 > 0 
    ? <span><span className="ellipsisBubble" id="firstEllipsis">&middot;&middot;&middot;</span></span>
    : '');
  const secondEllipsis = (props.currentPage + 3 <= props.totalPages
    ? <span><span className="ellipsisBubble" id="secondEllipsis">&middot;&middot;&middot;</span></span>
    : '');
  const middleRightBubble = (2 < props.currentPage && props.currentPage <= props.totalPages
    ? <span><span className="paginationBubble" id={selectedBubble4}  onClick={() => {props.handlePageChange(middleRightBubbleNumber); props.scrollToTopOfFeed();}}>{middleRightBubbleNumber}</span></span>
    : '');
  const middleLeftBubble = (props.currentPage < props.totalPages - 1
    ? <span><span className="paginationBubble" id={selectedBubble2}  onClick={() => {props.handlePageChange(middleLeftNumber); props.scrollToTopOfFeed();}}>{middleLeftNumber}</span></span>
    : '');

  return (
    <div id="paginationContainer">
      <span>
        <span className="paginationArrow" onClick={() => {props.handlePageChange(previousPage); props.scrollToTopOfFeed();}}>{'<'}</span>
      </span>
      <span>
        <span>
          <span className="paginationBubble" id={selectedBubble1} onClick={() => {props.handlePageChange(1); props.scrollToTopOfFeed();}}>1</span>
        </span>
        {firstEllipsis}
        {middleLeftBubble}
        <span>
          <span className="paginationBubble" id={selectedBubble3} onClick={() => {props.handlePageChange(middleBubbleNumber); props.scrollToTopOfFeed();}}>{middleBubbleNumber}</span>
        </span>
        {middleRightBubble}
        {secondEllipsis}
        <span>
          <span className="paginationBubble" id={selectedBubble5} onClick={() => {props.handlePageChange(props.totalPages); props.scrollToTopOfFeed();}}>{props.totalPages}</span>
        </span>
      </span>

      <span>
        <span className="paginationArrow" onClick={() => {props.handlePageChange(nextPage); props.scrollToTopOfFeed();}}>{'>'}</span>
      </span>
    </div>
  );
};
export default Pagination;
