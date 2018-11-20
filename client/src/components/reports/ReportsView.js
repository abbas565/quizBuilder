import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReportFeed from "./ReportFeed";
import Spinner from "../common/Spinner";
import { getReports } from "../../actions/reportActions";

class ReportsView extends Component {
  componentDidMount() {
    this.props.getReports();
  }

  render() {
    const { reports, loading } = this.props.report;
    let reportContent;

    if (reports === null || loading) {
      reportContent = <Spinner />;
    } else {
      reportContent = <ReportFeed reports={reports} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{reportContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

ReportsView.propTypes = {
  getReports: PropTypes.func.isRequired,
  report: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  report: state.report
});

export default connect(
  mapStateToProps,
  { getReports }
)(ReportsView);
