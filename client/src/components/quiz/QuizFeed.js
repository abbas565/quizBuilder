import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteQuiz } from "../../actions/quizActions";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";

class QuizFeed extends Component {
  onDeleteClick(id) {
    this.props.deleteQuiz(id);
  }
  render() {
    const { quizzes, auth } = this.props;
    console.log("user name:", auth.user.name);
    const authName = auth.user.name;

    const quizSum = this.props.quizzes.map(rep => (
      <tr key={rep._id}>
        {/* //{" "} */}
        {/* <td>
          <Moment format="YYYY/MM/DD">{rep.fedDate}</Moment>
          {" "}
        </td> */}
        <td>{rep._id}</td>
        <td>{rep.quizName}</td>

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
          <Link to={`/quizzes/${rep._id}`} className="btn btn-info">
            View Quiz
          </Link>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Quizzes</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Quiz Name</th>
              <th>Image</th>
              <th />
            </tr>
            {quizSum}
          </thead>
        </table>
      </div>
    );
  }
}

QuizFeed.propTypes = {
  deleteQuiz: PropTypes.func.isRequired,
  quizzes: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteQuiz }
)(QuizFeed);
