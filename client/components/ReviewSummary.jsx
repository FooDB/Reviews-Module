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
                    <div><h1>What {this.props.reviews.length} People Are Saying</h1></div>

                    <div>
                        <div id="leftSummaryContainer">
                            <div>Overall ratings and reviews</div>
                            <div id="reviewConditional">Reviews can only be made by diners who have eaten at this restaurant</div>
                            <div>
                                <div className="summaryRating">
                                    <span><img className="star" src={starSource[0]}/></span>
                                    <span><img className="star" src={starSource[1]}/></span>
                                    <span><img className="star" src={starSource[2]}/></span>
                                    <span><img className="star" src={starSource[3]}/></span>
                                    <span><img className="star" src={starSource[4]}/></span>
                                </div>
                                <div className="summaryRating">
                                    <span> &nbsp; {this.props.ratings.totalAverage}</span>
                                    <span> Based on Recent Ratings</span>
                                </div>
                            </div>
                            <div>
                                <div className="summaryRating">
                                    <div>Food</div>
                                    <div>{this.props.ratings.foodAverage}</div>
                                </div>
                                <div className="summaryRating">
                                    <div>Service</div>
                                    <div>{this.props.ratings.serviceAverage}</div>
                                </div>
                                <div className="summaryRating">
                                    <div>Ambiance</div>
                                    <div>{this.props.ratings.ambianceAverage}</div>
                                </div>
                                <div className="summaryRating">
                                    <span>Value</span>
                                    <span>{this.props.ratings.valueAverage}</span>
                                </div>
                            </div>
                            <div>
                                <div className="inlineBlock">
                                    <span><i>icon</i></span>
                                    <span>Noise <span> {noiseLevel}</span></span>
                                </div>
                            </div>
                            <div>
                                <div className="inlineBlock">
                                    <div><i>Icon</i></div>
                                    <div>{this.props.ratings.recommended}% of people <span> Would recommend to Friend</span></div>
                                </div>
                            </div>
                        </div>
                        <div id="summaryToolbarContainer">
                            <div>
                                <div>
                                    <span>5</span>
                                    <div>toolbar<span></span></div>
                                </div>
                                <div>
                                    <span>4</span>
                                    <div>toolbar<span></span></div>
                                </div>
                                <div>
                                    <span>3</span>
                                    <div>toolbar<span></span></div>
                                </div>
                                <div>
                                    <span>2</span>
                                    <div>toolbar<span></span></div>
                                </div>
                                <div>
                                    <span>1</span>
                                    <div>toolbar<span></span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                
                    <div>
                        <div>
                            <div>Loved For <a>link</a><i></i></div>
                            <div>
                                <a>
                                    <div>
                                        <div>
                                            <div><i>Icon</i></div>
                                            <div>
                                                <div>Italian</div>
                                                <div>San Francisco</div>
                                            </div>
                                        </div>    
                                    </div>
                                </a>
                                <a>
                                <div>
                                    <div>
                                        <div><i>icon</i></div>
                                            <div>
                                                <div>Italian</div>
                                                <div>SF Bay Area</div>
                                            </div>
                                        </div>    
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>


                    <div><a href="#">Best Restaurants</a></div>
                </div>
            </div>
        )
    }
}

export default ReviewSummary;