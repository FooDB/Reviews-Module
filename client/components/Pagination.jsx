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
        return (
            <div id="paginationContainer">
                <span>
                    <span className="paginationArrow" onClick={() => this.props.handlePageChange(previousPageArrow)}>{'<'}</span>
                </span>

                <span>
                    <span>
                        <span className="paginationBubble" onClick={() => this.props.handlePageChange(this.props.currentPage - 1)}>{this.props.currentPage}</span>
                    </span>
                    <span>
                        <span className="paginationBubble" onClick={() => this.props.handlePageChange(this.props.currentPage + 1)}>{this.props.currentPage + 1}</span>
                    </span>
                    <span>
                        <span className="paginationBubble" onClick={() => this.props.handlePageChange(this.props.currentPage + 2)}>{this.props.currentPage + 2}</span>
                    </span>
                    <span>
                        <span className="paginationBubble">...</span>
                    </span>
                    <span>
                        <span className="paginationBubble" onClick={() => this.props.handlePageChange(this.props.totalPages)}>{this.props.totalPages}</span>
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