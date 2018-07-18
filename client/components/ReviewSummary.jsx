class ReviewSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <h1>What {this.props.reviews.length} People Are Saying</h1>
            </div>
        )
    }
}

export default ReviewSummary;