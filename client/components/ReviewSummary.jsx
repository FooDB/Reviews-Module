import LovedForBox from "./LovedForBox.jsx";

class ReviewSummary extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let noiseLevel, starSource;
        if (this.props.ratings.noise > 1) {
            noiseLevel = 'Loud';
        } else if (this.props.ratings.noise < 1 && this.props.ratings.noise > 0) {
            noiseLevel = 'Moderate';
        } else {
            noiseLevel = 'Quiet';
        }
        this.props.stars ? starSource = this.props.stars : starSource = ['','','','',''];
        return (
            <div id="reviewSummaryContainer">
                <div>
                    <div className="summaryHeader">What {this.props.length} People Are Saying</div>
                    <div>
                        <div id="leftSummaryContainer">
                            <div><strong>Overall ratings and reviews</strong></div>
                            <div id="reviewConditional">Reviews can only be made by diners who have eaten at this restaurant</div>
                            <div>
                                <div className="summaryStarRating">
                                    <span><img className="star" src={starSource[0]}/></span>
                                    <span><img className="star" src={starSource[1]}/></span>
                                    <span><img className="star" src={starSource[2]}/></span>
                                    <span><img className="star" src={starSource[3]}/></span>
                                    <span><img className="star" src={starSource[4]}/></span>
                                </div>
                                <div className="summaryStarRating">
                                    <span> &nbsp; {this.props.ratings.totalAverage}</span>
                                    <span> Based on Recent Ratings</span>
                                </div>
                            </div>
                            <div>
                                <div className="summaryRating" id="summaryFirstRating">
                                    <div><strong>{this.props.ratings.foodAverage}</strong></div>
                                    <div>Food</div>
                                </div>
                                <div className="summaryRating">
                                    <div><strong>{this.props.ratings.serviceAverage}</strong></div>
                                    <div>Service</div>
                                </div>
                                <div className="summaryRating">
                                    <div><strong>{this.props.ratings.ambianceAverage}</strong></div>
                                    <div>Ambiance</div>
                                </div>
                                <div className="summaryRating">
                                    <div><strong>{this.props.ratings.valueAverage}</strong></div>
                                    <div>Value</div>
                                </div>
                            </div>
                            <div className="summarySpacingContainer">
                                <div className="inlineBlock">
                                    <span><img className="summaryIcon" src="./images/risingBars.png" /></span>
                                    <span>Noise &#8226;<span> {noiseLevel}</span></span>
                                </div>
                            </div>
                            <div className="summarySpacingContainer">
                                <div className="inlineBlock">
                                    <span><img className="summaryIcon" src="./images/thumbsUp.png" /></span>
                                    <span><strong>{this.props.ratings.recommended}% of people</strong> <span>would recommend it to a friend</span></span>
                                </div>
                            </div>
                        </div>
                        <div id="summaryToolbarContainer">
                            <div>
                                <div className="toolbarAndNumber" onClick={() => this.props.filter(5)}>
                                    <span className="toolbarNumber">5</span>
                                    <span className="toolbarBox">toolbar<span></span></span>
                                </div>
                                <div className="toolbarAndNumber" onClick={() => this.props.filter(4)}>
                                    <span className="toolbarNumber">4</span>
                                    <span className="toolbarBox">toolbar<span></span></span>
                                </div>
                                <div className="toolbarAndNumber" onClick={() => this.props.filter(3)}>
                                    <span className="toolbarNumber">3</span>
                                    <span className="toolbarBox">toolbar<span></span></span>
                                </div>
                                <div className="toolbarAndNumber" onClick={() => this.props.filter(2)}>
                                    <span className="toolbarNumber">2</span>
                                    <span className="toolbarBox">toolbar<span></span></span>
                                </div>
                                <div className="toolbarAndNumber" onClick={() => this.props.filter(1)}>
                                    <span className="toolbarNumber">1</span>
                                    <span className="toolbarBox">toolbar<span></span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                
                    <div id="lovedForContainer">
                        <div>
                            <div  id="lovedForContainer"><strong>Loved For </strong><a href="#"><img className="summaryIcon" src="./images/infoIcon.png" /></a></div>
                            <div >
                                {this.props.lovedFor.map(item => <LovedForBox lovedFor={item} key={item.id}/>)}
                            </div>
                        </div>
                    </div>


                    <div><a href="#">Best Restaurants in (restaurant area)</a></div>
                </div>
            </div>
        )
    }
}

export default ReviewSummary;