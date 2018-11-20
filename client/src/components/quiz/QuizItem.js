import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";

class QuizItem extends Component {
  render() {
    const { question, auth, showActions } = this.props;

    const answerCorrect = [
      { label: "* Choose answer state", value: 0 },
      { label: "Correct", value: "true" },
      { label: "In Correct", value: "false" }
    ];

    return (
      <div>
        <h4 className="mb-4">Physics Question</h4>

        <p>{this.props.question._id}</p>
        <p>{this.props.question.mainText}</p>
        <ol>
          <li>{this.props.question.answers.answer01.ansText}</li>
          <li>{this.props.question.answers.answer02.ansText}</li>
          <li>{this.props.question.answers.answer03.ansText}</li>
          <li>{this.props.question.answers.answer04.ansText}</li>
        </ol>
        {console.log(this.props.question.questionImage)}
        {!isEmpty(this.props.question.questionImage) ? (
          <img
            className="questionImgBig"
            src={"../" + this.props.question.questionImage}
            alt="Question Image"
          />
        ) : (
          <h4>No Image</h4>
        )}
      </div>
    );
  }
}

QuestionItem.defaultProps = {
  showActions: true
};

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(QuizItem);
