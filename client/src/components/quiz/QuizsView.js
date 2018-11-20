import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import QuizFeed from "./QuizFeed";
import Spinner from "../common/Spinner";
import { getQuizs } from "../../actions/quizActions";

class QuizsView extends Component {
  componentDidMount() {
    this.props.getQuizs();
  }

  render() {
    console.log("this.props.quiz:", this.props.quizzes);
    const { quizzes, loading } = this.props.quiz;
    let quizContent;

    if (quizzes === null || loading) {
      quizContent = <Spinner />;
    } else {
      quizContent = <QuizFeed quizzes={quizzes} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{quizContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

QuizsView.propTypes = {
  getQuizs: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  quiz: state.quiz
});

export default connect(
  mapStateToProps,
  { getQuizs }
)(QuizsView);
