import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";
import QuestionView from "../question/QuestionView";

class ExamItem extends Component {
  render() {
    const { exam, auth, showActions } = this.props;

    return (
      <div>
        <h4 className="mb-4">Physics Exam</h4>

        <p>Exam ID:{this.props.exam._id}</p>
        <p>Exam Name: {this.props.exam.examName}</p>
        <p>Exam Instructor: {this.props.exam.examOwner}</p>

        {/* <ol>
          {this.props.quiz.sQuestions.map(question => (
            <li key={question.mainText}>
              {question.mainText}
              <ol>
                <li>{question.answers.answer01.ansText}</li>
                <li>{question.answers.answer02.ansText}</li>
                <li>{question.answers.answer03.ansText}</li>
                <li>{question.answers.answer04.ansText}</li>

                {!isEmpty(question.questionImage) ? (
                  <img
                    className="questionImgBig"
                    src={"../" + question.questionImage}
                    alt="Question Image"
                  />
                ) : (
                  <h4>No Image</h4>
                )}
              </ol>
              <br />
            </li>
          ))}
        </ol> */}
      </div>
    );
  }
}

ExamItem.defaultProps = {
  showActions: true
};

ExamItem.propTypes = {
  exam: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  // question: state.question
});

export default connect(mapStateToProps)(ExamItem);
