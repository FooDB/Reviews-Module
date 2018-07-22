import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div id="pagination container">
                <span>
                    <span>left arrow</span>
                </span>

                <span>
                    <span>
                        <span>1</span>
                    </span>
                    <span>
                        <span onClick={() => this.props.handlePageChange(2)}>2</span>
                    </span>
                    <span>
                        <span>3</span>
                    </span>
                    <span>
                        <span>...</span>
                    </span>
                    <span>
                        <span>53</span>
                    </span>
                </span>
                
                <span>
                    <span>right arrow</span>
                </span>
            </div>
        )
    }
}
export default Pagination;