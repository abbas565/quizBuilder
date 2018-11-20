import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteReport } from "../../actions/reportActions";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";

class ReportFeed extends Component {
  onDeleteClick(id) {
    this.props.deleteReport(id);
  }
  render() {
    const { reports, auth } = this.props;
    console.log("user name:", auth.user.name);
    const authName = auth.user.name;

    const reportSum = this.props.reports.map(rep => (
      <tr key={rep._id}>
        <td>
          <Moment format="YYYY/MM/DD">{rep.fedDate}</Moment>
        </td>
        <td>{rep.howManyDucks}</td>
        <td>{rep.foodType}</td>
        <td>{rep.name}</td>
        <td>
          {!isEmpty(rep.reportImage) ? (
            <img
              className="reportImgSmall"
              src={"../" + rep.reportImage}
              alt="Report Image"
            />
          ) : (
            <p>No Image</p>
          )}
        </td>

        <td>
          <button
            onClick={this.onDeleteClick.bind(this, rep._id)}
            className="btn btn-danger"
            disabled={authName !== "admin" ? true : false}
          >
            Delete
          </button>
        </td>
        <td>
          <Link to={`/reports/${rep._id}`} className="btn btn-info">
            View Report
          </Link>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Ducks fed Report</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Number of Ducks</th>
              <th>Food Type</th>
              <th>Feeder Name</th>
              <th>Image</th>
              <th />
            </tr>
            {reportSum}
          </thead>
        </table>
      </div>
    );
  }
}

ReportFeed.propTypes = {
  deleteReport: PropTypes.func.isRequired,
  reports: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteReport }
)(ReportFeed);
