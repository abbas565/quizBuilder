import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";

class QuestionItem extends Component {
  render() {
    const { question, auth, showActions } = this.props;

    return (
      <div>
        <h4 className="mb-4">Physics Question</h4>
        <p>Question ID is: {this.props.question._id}</p>
        <p>Question Type is : {this.props.question.questionType}</p>

        {this.props.question.questionType == 1 ? (
          <p>Question Type: Multiple Choice</p>
        ) : this.props.question.questionType == 2 ? (
          <p>Question Type: Single Choice</p>
        ) : (
          <p>Question Type: Short Answer/Essay Question</p>
        )}

        {/* {!isEmpty(this.props.question.answers) ? (
          [
            this.props.question.answers.answer01.ansCorrect,
            this.props.question.answers.answer02.ansCorrect,
            this.props.question.answers.answer03.ansCorrect,
            this.props.question.answers.answer04.ansCorrect
          ].filter(function(value) {
            return value === true;
          }).length > 1 ? (
            <p>Question Type: Multiple Choice</p>
          ) : (
            <p>Question Type: Single Choice</p>
          )
        ) : (
          <p>Question Type: Short Answer/Essay Question</p>
        )} */}
        <p>{this.props.question.mainText}</p>
        {this.props.question.questionType == 1 ||
        this.props.question.questionType == 2 ? (
          <ol>
            <li>{this.props.question.answers.answer01.ansText}</li>
            <li>{this.props.question.answers.answer02.ansText}</li>
            <li>{this.props.question.answers.answer03.ansText}</li>
            <li>{this.props.question.answers.answer04.ansText}</li>
          </ol>
        ) : (
          <p>This question needs descriptional answer</p>
        )}
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

export default connect(mapStateToProps)(QuestionItem);
