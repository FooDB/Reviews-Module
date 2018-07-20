class ReviewToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <div>Sort By</div>
                <div>
                    <select>
                        <option>Newest</option>
                        <option>Highest Rating</option>
                        <option>Lowest Rating</option>
                    </select>
                </div>
                <div>Filters</div>
                <div>
                    <span>
                        <input type="checkbox" />
                        <label>
                            <span>Good For Groups</span>
                        </label>
                    </span>
                    <span>
                        <input type="checkbox" />
                        <label>
                            <span>KeyWord</span>
                        </label>
                    </span>
                    <span>
                        <input type="checkbox" />
                        <label>
                            <span>KeyWord</span>
                        </label>
                    </span>
                    <span>
                        <input type="checkbox" />
                        <label>
                            <span>KeyWord</span>
                        </label>
                    </span>
                    <span>
                        <input type="checkbox" />
                        <label>
                            <span>KeyWord</span>
                        </label>
                    </span>
                </div>
            </div>
        )
    }
}
export default ReviewToolbar;