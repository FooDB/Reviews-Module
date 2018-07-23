import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let nextPage = (this.props.currentPage === this.props.totalPages ? this.props.currentPage : this.props.currentPage + 1);
        let previousPage = (this.props.currentPage === 1 ? this.props.currentPage : this.props.currentPage - 1);
        let middleRightBubbleNumber = (this.props.currentPage + 3 <= this.props.totalPages ? this.props.currentPage + 1 : this.props.totalPages - 1)
        let middleBubbleNumber = (this.props.currentPage < 3 ? 3 : this.props.currentPage);
        if (this.props.currentPage > this.props.totalPages - 2 && this.props.currentPage !== this.props.totalPages) {
            middleBubbleNumber = this.props.currentPage - 1;
        } else if (this.props.currentPage === this.props.totalPages) {
            middleBubbleNumber = this.props.currentPage - 2;
        }
        let middleLeftNumber = (this.props.currentPage < 3 ? 2 : this.props.currentPage - 1)
        let firstElipsis = (this.props.currentPage - 3 > 0 
                            ? <span><span className="paginationBubble" id="firstElipsis">...</span></span>
                            : '')
        let secondElipsis = (this.props.currentPage + 3 <= this.props.totalPages
                            ? <span><span className="paginationBubble" id="secondElipsis">...</span></span>
                            : '')
        let selectedBubble1, selectedBubble2, selectedBubble3, selectedBubble4, selectedBubble5;
        selectedBubble1 = (this.props.currentPage === 1 ? 'selectedBubble' : 'first')
        selectedBubble2 = (this.props.currentPage === middleLeftNumber ? 'selectedBubble' : 'middleLeft')
        selectedBubble3 = (this.props.currentPage === middleBubbleNumber ? 'selectedBubble' : 'middle')
        selectedBubble4 = (this.props.currentPage === middleRightBubbleNumber ? 'selectedBubble' : 'middleRight')
        selectedBubble5 = (this.props.currentPage === this.props.totalPages ? 'selectedBubble' : 'last')
        let middleRightBubble = (3 < this.props.currentPage && this.props.currentPage <= this.props.totalPages
                            ? <span><span className="paginationBubble" id={selectedBubble4}  onClick={() => this.props.handlePageChange(middleRightBubbleNumber)}>{middleRightBubbleNumber}</span></span>
                            : '')
        let middleLeftBubble =  (this.props.currentPage < this.props.totalPages - 1
            ? <span><span className="paginationBubble" id={selectedBubble2}  onClick={() => this.props.handlePageChange(middleLeftNumber)}>{middleLeftNumber}</span></span>
            : '')
        return (
            <div id="paginationContainer">
                <span>
                    <span className="paginationArrow" onClick={() => this.props.handlePageChange(previousPage)}>{'<'}</span>
                </span>
                <span>
                    <span>
                        <span className="paginationBubble" id={selectedBubble1} onClick={() => this.props.handlePageChange(1)}>1</span>
                    </span>
                    {firstElipsis}
                    {middleLeftBubble}
                    <span>
                        <span className="paginationBubble" id={selectedBubble3} onClick={() => this.props.handlePageChange(middleBubbleNumber)}>{middleBubbleNumber}</span>
                    </span>
                    {middleRightBubble}
                    {secondElipsis}
                    <span>
                        <span className="paginationBubble" id={selectedBubble5} onClick={() => this.props.handlePageChange(this.props.totalPages)}>{this.props.totalPages}</span>
                    </span>
                </span>

                <span>
                    <span className="paginationArrow" onClick={() => this.props.handlePageChange(nextPage)}>{'>'}</span>
                </span>
            </div>
        )
    }
}
export default Pagination;