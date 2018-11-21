import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import QuizItem from "./QuizItem";
import Spinner from "../common/Spinner";
import { getQuiz } from "../../actions/quizActions";

class Quiz extends Component {
  componentDidMount() {
    console.log("The quiz id is:", this.props.match.params.id);
    this.props.getQuiz(this.props.match.params.id);
  }

  render() {
    const { quiz, loading } = this.props.quiz;
    let quizContent;

    if (quiz === null || loading || Object.keys(quiz).length === 0) {
      quizContent = <Spinner />;
    } else {
      quizContent = (
        <div>
          <QuizItem quiz={quiz} showActions={false} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/quizzesview" className="btn btn-light mb-3">
                Back To Quizzes
              </Link>
              {quizContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  getQuiz: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  quiz: state.quiz
});

export default connect(
  mapStateToProps,
  { getQuiz }
)(Quiz);
