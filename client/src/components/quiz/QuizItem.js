import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";
import QuestionView from "../question/QuestionView";

class QuizItem extends Component {
  render() {
    const { quiz, auth, showActions } = this.props;

    return (
      <div>
        <h4 className="mb-4">Physics Quiz</h4>

        {/* <p>{this.props.quiz._id}</p> */}
        <p>Quiz Name: {this.props.quiz.quizName}</p>

        {/* {this.props.quiz.selectedQueId.map(number => (
          <li>{number}</li>
        ))} */}
        {/* <ol>
          {this.props.quiz.selectedQueId.map(question01 => (
            <li key={question01}>
              <QuestionView question01={question01} showActions={false} />
            </li>
          ))}
        </ol> */}

        <ol>
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
        </ol>
      </div>
    );
  }
}

QuizItem.defaultProps = {
  showActions: true
};

QuizItem.propTypes = {
  quiz: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  // question: state.question
});

export default connect(mapStateToProps)(QuizItem);
