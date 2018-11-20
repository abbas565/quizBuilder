import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import QuestionItem from "./QuestionItem";
import Spinner from "../common/Spinner";
import { getQuestion } from "../../actions/questionActions";

class Question extends Component {
  componentDidMount() {
    console.log("The question id is:", this.props.match.params.id);
    this.props.getQuestion(this.props.match.params.id);
  }

  render() {
    const { question, loading } = this.props.question;
    let questionContent;

    if (question === null || loading || Object.keys(question).length === 0) {
      questionContent = <Spinner />;
    } else {
      questionContent = (
        <div>
          <QuestionItem question={question} showActions={false} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/questions" className="btn btn-light mb-3">
                Back To Questions
              </Link>
              {questionContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  question: state.question
});

export default connect(
  mapStateToProps,
  { getQuestion }
)(Question);
