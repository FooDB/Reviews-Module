class ReviewSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
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
                                    <span><img className="star" /></span>
                                    <span><img className="star" /></span>
                                    <span><img className="star" /></span>
                                    <span><img className="star" /></span>
                                    <span><img className="star" /></span>
                                </div>
                                <div>
                                    <span>4.8</span>
                                    <span>Based on Recent Ratings</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>4.8</div>
                                    <div>Food</div>
                                </div>
                                <div>
                                    <div>4.5</div>
                                    <div>Service</div>
                                </div>
                                <div>
                                    <div>4.7</div>
                                    <div>Ambiance</div>
                                </div>
                                <div>
                                    <div>4.3</div>
                                    <div>Value</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div><i>icon</i></div>
                                    <div>Noise<span>Moderate</span></div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div><i>Icon</i></div>
                                    <div>93% of people<span>Would recommend to Friend</span></div>
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