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

        <p>{this.props.quiz._id}</p>

        {this.props.quiz.selectedQueId.map(number => (
          <li>{number}</li>
        ))}
        <ol>
          {this.props.quiz.selectedQueId.map(question01 => (
            <li key={question01}>
              <QuestionView question01={question01} showActions={false} />
            </li>
          ))}
        </ol>

        {/* <ul>
          {React.Children.map(this.props.quiz.selectedQueId, question01 => (
            <li>
              {<QuestionView question01={question01} showActions={false} />}
            </li>
          ))}
        </ul> */}

        {/* <ol>
          <li>
            {
              <QuestionView
                question01={this.props.quiz.selectedQueId[0]}
                showActions={false}
              />
            }
          </li>
          <li>
            {
              <QuestionView
                question01={this.props.quiz.selectedQueId[1]}
                showActions={false}
              />
            }
          </li>
          <li>
            {
              <QuestionView
                question01={this.props.quiz.selectedQueId[2]}
                showActions={false}
              />
            }
          </li>
          <li>
            {
              <QuestionView
                question01={this.props.quiz.selectedQueId[3]}
                showActions={false}
              />
            }
          </li>
        </ol> */}

        <ol>
          {this.props.quiz.selectedQueId.forEach(question01 => {
            console.log("question id are:", question01);
          })}
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
