import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";

class ReportItem extends Component {
  render() {
    const { report, auth, showActions } = this.props;

    const reportDetail = (
      <tr key={this.props.report._id}>
        <td>
          <Moment format="YYYY/MM/DD">{this.props.report.fedDate}</Moment>
        </td>
        <td>{this.props.report.name}</td>
        <td>{this.props.report.howManyDucks}</td>
        <td>{this.props.report.foodType}</td>
        <td>{this.props.report.where}</td>
        <td>{this.props.report.howMuchFood}</td>
        <td>{this.props.report.reportImage}</td>
      </tr>
    );

    return (
      <div>
        <h4 className="mb-4">Ducks fed Report</h4>

        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Feeder Name</th>
              <th>Number of Ducks</th>
              <th>Food Type</th>
              <th>Where</th>
              <th>How Much Food(Gr)</th>
              <th>Image Path</th>
              <th />
            </tr>
            {reportDetail}
          </thead>
        </table>
        {console.log(this.props.report.reportImage)}
        {!isEmpty(this.props.report.reportImage) ? (
          <img
            className="reportImgBig"
            src={"../" + this.props.report.reportImage}
            alt="Report Image"
          />
        ) : (
          <h4>No Image</h4>
        )}
      </div>
    );
  }
}

ReportItem.defaultProps = {
  showActions: true
};

ReportItem.propTypes = {
  report: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ReportItem);
