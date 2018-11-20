import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReportForm from "./ReportForm";
import { getReports } from "../../actions/reportActions";

class ReportsGen extends Component {
  componentDidMount() {
    this.props.getReports();
  }

  render() {
    const { reports, loading } = this.props.report;

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ReportForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReportsGen.propTypes = {
  getReports: PropTypes.func.isRequired,
  report: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  report: state.report
});

export default connect(
  mapStateToProps,
  { getReports }
)(ReportsGen);
