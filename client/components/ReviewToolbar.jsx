import React from 'react';
import FilterBox from './FilterBox.jsx';

class ReviewToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ddSelected: false,
            display: 'none',
            current: 'Newest',
        }
    }
    handleSelection(e) {
        console.log('handleselection called', e.target.textContent)
        this.setState({ddSelected: !this.state.ddSelected, current: e.target.textContent})
        !this.state.ddSelected ? this.setState({display: 'block'}) : this.setState({display: 'none'})
        // this.props.sortReviews(e.target.value);
    }
    render() {
        return (
            <div id="toolbarContainer">
                <div id="toolbarSortText">Sort By</div>
                <div id="dropdownHeader" onClick={(e) => this.handleSelection(e)}>{this.state.current}</div>
                <div>
                    <div className="dropdownItem" value="Newest" onClick={(e) => {this.props.sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e)}} style={{display: this.state.display}}>Newest</div>
                    <div className="dropdownItem" value="Highest"onClick={(e) => {this.props.sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e)}} style={{display: this.state.display}}>Highest Rating</div>
                    <div className="dropdownItem" value="Lowest" onClick={(e) => {this.props.sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e)}} style={{display: this.state.display}}>Lowest Rating</div>
                </div>
    
    
                <div id="sortSelection">
                    <select id="sortMethod" onChange={() => this.props.sortReviews()}>
                        <option value="Newest">Newest</option>
                        <option value="Highest">Highest Rating</option>
                        <option value="Lowest">Lowest Rating</option>
                    </select>
                </div>
                <div id="filtersHeader">Filters</div>
                <div>
                    {this.props.keyWords.map(keyWord => <FilterBox keyWord={keyWord} key={keyWord.id} filterReviews={this.props.filterReviews}/>)}
                </div>
            </div>
        )
    }
}
export default ReviewToolbar;