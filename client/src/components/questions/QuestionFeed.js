import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteQuestion } from "../../actions/questionActions";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";

class QuestionFeed extends Component {
  onDeleteClick(id) {
    this.props.deleteQuestion(id);
  }
  render() {
    const { questions, auth } = this.props;
    console.log("user name:", auth.user.name);
    const authName = auth.user.name;

    const questionSum = this.props.questions.map(qus => (
      <tr key={qus._id}>
        {/* <td>
          <Moment format="YYYY/MM/DD">{qus.questionDate}</Moment>
        </td> */}
        <td>{qus.courseId}</td>
        <td>{qus.courseLevel}</td>
        <td>{qus.name}</td>
        <td>
          {!isEmpty(qus.questionImage) ? (
            <img
              className="questionImgSmall"
              src={"../" + qus.questionImage}
              alt="Question Image"
            />
          ) : (
            <p>No Image</p>
          )}
        </td>

        <td>
          <button
            onClick={this.onDeleteClick.bind(this, qus._id)}
            className="btn btn-danger"
            disabled={authName !== "admin" ? true : false}
          >
            Delete
          </button>
        </td>
        <td>
          <Link to={`/questions/${qus._id}`} className="btn btn-info">
            View Question
          </Link>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Question</h4>
        <table className="table">
          <thead>
            <tr>
              {/* <th>Date</th> */}
              <th>Course ID</th>
              <th>Course Level</th>
              <th>Instructor Name</th>
              <th>Image</th>
              <th />
            </tr>
            {questionSum}
          </thead>
        </table>
      </div>
    );
  }
}

QuestionFeed.propTypes = {
  deleteQuestion: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteQuestion }
)(QuestionFeed);
