import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReportItem from "./ReportItem";
import Spinner from "../common/Spinner";
import { getReport } from "../../actions/reportActions";

class Report extends Component {
  componentDidMount() {
    console.log("The report id is:", this.props.match.params.id);
    this.props.getReport(this.props.match.params.id);
  }

  render() {
    const { report, loading } = this.props.report;
    let reportContent;

    if (report === null || loading || Object.keys(report).length === 0) {
      reportContent = <Spinner />;
    } else {
      reportContent = (
        <div>
          <ReportItem report={report} showActions={false} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/reports" className="btn btn-light mb-3">
                Back To Reports
              </Link>
              {reportContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Report.propTypes = {
  getReport: PropTypes.func.isRequired,
  report: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  report: state.report
});

export default connect(
  mapStateToProps,
  { getReport }
)(Report);
