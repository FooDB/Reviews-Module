class ReportPopUp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="modalContainer">
            <div className="modalBackground" >
                <div className="modalContent"  ref={this.props.setNode()}>
                    <div id="reviewReport">
                        <div id="reportHeadContainer">
                            <div id="reportHeadText"><strong>Report this review as inappropriate?</strong></div>
                        </div>
                        <div id="reportBodyContainer">
                            <div id="reportBodyText"><strong>If you believe this review should be removed from OpenTable, please let us know and someone will investigate.</strong></div>
                            <form>
                                <input type="hidden" />
                                <textarea id="reviewReasonText" placeholder="Tell us why you find the review inappropriate." required="required"></textarea>
                                <div id="reportButtonsContainer">
                                    <button id="reportConfirm" type="submit" onClick={(e) => this.toggleReportModal(e)}>Report</button>
                                    <button id="reportCancel" onClick={(e) => this.toggleReportModal(e)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default ReportPopUp;