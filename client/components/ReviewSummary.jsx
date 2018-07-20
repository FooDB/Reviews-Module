class ReviewSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stars: [],
            overallRating: this.props.ratings.totalAverage
        }
    }
    componentWillMount() {
        for (let i = 0; i < 5; i++) {
            this.props.ratings.totalAverage > 0 ? this.state.stars.push("./images/star-16.png") : this.state.stars.push("./images/unfilled_star.png");
            this.props.ratings.totalAverage--;
        }
    }
    render() {
        let noiseLevel;
        if (this.props.ratings.noise > 1) {
            noiseLevel = 'Loud';
        } else if (this.props.ratings.noise < 1 && this.props.ratings.noise > 0) {
            noiseLevel = 'Moderate';
        } else {
            noiseLevel = 'Quiet';
        }
        return (
            <div>
                <div>
                    <div><h1>What {this.props.reviews.length} People Are Saying</h1></div>

                    <div>
                        <div>
                            <div>Overall ratings and reviews</div>
                            <div>Reviews can only be made by diners who have eaten at this restaurant</div>
                            <div>
                                <div>
                                    <span><img className="star" src={this.state.stars[0]}/></span>
                                    <span><img className="star" src={this.state.stars[1]}/></span>
                                    <span><img className="star" src={this.state.stars[2]}/></span>
                                    <span><img className="star" src={this.state.stars[3]}/></span>
                                    <span><img className="star" src={this.state.stars[4]}/></span>
                                </div>
                                <div>
                                    <span>{this.props.ratings.totalAverage}</span>
                                    <span> Based on Recent Ratings</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>Food</div>
                                    <div>{this.props.ratings.foodAverage}</div>
                                </div>
                                <div>
                                    <div>Service</div>
                                    <div>{this.props.ratings.serviceAverage}</div>
                                </div>
                                <div>
                                    <div>Ambiance</div>
                                    <div>{this.props.ratings.ambianceAverage}</div>
                                </div>
                                <div>
                                    <div>Value</div>
                                    <div>{this.props.ratings.valueAverage}</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div><i>icon</i></div>
                                    <div>Noise <span> {noiseLevel}</span></div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div><i>Icon</i></div>
                                    <div>{this.props.ratings.recommended}% of people <span> Would recommend to Friend</span></div>
                                </div>
                            </div>
                        </div>
                        <div>
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