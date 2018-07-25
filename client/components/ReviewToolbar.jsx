import React from 'react';
import FilterBox from './FilterBox.jsx';

class ReviewToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ddSelected: false,
            display: 'none',
            current: 'Newest',
            arrow: './images/downArrow.png'
        }
    }
    handleSelection(e) {
        console.log('handleselection called', e.target.textContent);
        this.setState({ddSelected: !this.state.ddSelected});
        e.target.textContent ? this.setState({current: e.target.textContent}) : null;
        if (!this.state.ddSelected) {
            this.setState({display: 'block'})
            this.setState({arrow: './images/upArrow.png'})
        } else {
            this.setState({display: 'none'});
            this.setState({arrow: './images/downArrow.png'})
        } 
    }
    render() {
        return (
            <div id="toolbarContainer">
                <div id="toolbarSortText">Sort By</div>

                <div id="dropdownHeader" onClick={(e) => this.handleSelection(e)}>
                    <span>{this.state.current}</span>
                    <span><img className="star" src={this.state.arrow} /></span>
                </div>
                <div className="dropdownContainer" style={{display: this.state.display}}>
                    <div className="dropdownItem" value="Newest" onClick={(e) => {this.props.sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e)}} >Newest</div>
                    <div className="dropdownItem" value="Highest"onClick={(e) => {this.props.sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e)}} >Highest Rating</div>
                    <div className="dropdownItem" value="Lowest" onClick={(e) => {this.props.sortReviews(e.target.textContent.split(' ')[0]); this.handleSelection(e)}} >Lowest Rating</div>
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