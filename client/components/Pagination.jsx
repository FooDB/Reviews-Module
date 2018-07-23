import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let nextPageArrow = (this.props.currentPage === this.props.totalPages ? this.props.currentPage : this.props.currentPage + 1);
        let previousPageArrow = (this.props.currentPage === 1 ? this.props.currentPage : this.props.currentPage - 1);
        let firstElipsis = (this.props.currentPage - 3 > 0 
                            ? <span><span className="paginationBubble" id="firstElipsis">...</span></span>
                            : '')
        let secondElipsis = (this.props.currentPage + 5 <= this.props.totalPages
                            ? <span><span className="paginationBubble" id="secondElipsis">...</span></span>
                            : '')
        let middleRightBubbleNumber = (this.props.currentPage + 5 <= this.props.totalPages ? this.props.currentPage + 3 : this.props.totalPages - 1)
        let middleBubbleNumber = (this.props.currentPage + 4 <= this.props.totalPages ? this.props.currentPage + 2 : this.props.totalPages - 1)
        let middleLeftNumber = (this.props.currentPage + 4 <= this.props.totalPages ? this.props.currentPage + 1 : this.props.totalPages - 2)
        let middleRightBubble = (3 < this.props.currentPage && this.props.currentPage < this.props.totalPages - 3
                            ? <span><span className="paginationBubble" id="middleRightBubble">{middleRightBubbleNumber}</span></span>
                            : '')
        
        return (
            <div id="paginationContainer">
                <span>
                    <span className="paginationArrow" onClick={() => this.props.handlePageChange(previousPageArrow)}>{'<'}</span>
                </span>
                <span>
                    <span>
                        <span className="paginationBubble" id="firstBubble" onClick={() => this.props.handlePageChange(1)}>1</span>
                    </span>
                    {firstElipsis}
                    <span>
                        <span className="paginationBubble" id="middleLeftBubble" onClick={() => this.props.handlePageChange(this.props.currentPage + 1)}>{middleLeftNumber}</span>
                    </span>
                    <span>
                        <span className="paginationBubble" id="middleBubble" onClick={() => this.props.handlePageChange(this.props.currentPage + 2)}>{middleBubbleNumber}</span>
                    </span>
                    {middleRightBubble}
                    {secondElipsis}
                    <span>
                        <span className="paginationBubble" id="lastBubble" onClick={() => this.props.handlePageChange(this.props.totalPages)}>{this.props.totalPages}</span>
                    </span>
                </span>

                <span>
                    <span className="paginationArrow" onClick={() => this.props.handlePageChange(nextPageArrow)}>{'>'}</span>
                </span>
            </div>
        )
    }
}
export default Pagination;