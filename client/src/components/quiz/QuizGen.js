import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import QuizFeed from "./QuizFeed";
import QuizBuilder from "./QuizBuilder";
import Spinner from "../common/Spinner";
import { getQuestions } from "../../actions/questionActions";
import EnhancedTable01 from "../common/EnhancedTable01";

class QuizGen extends Component {
  componentWillMount() {
    this.props.getQuestions();
  }

  render() {
    const { questions, loading } = this.props.question;
    console.log("question init QuizGen are:", this.props.question);

    let questionContent;

    if (questions === null || loading || questions === undefined) {
      questionContent = <Spinner />;
    } else {
      console.log("questions QuizGen befor are:", questions);
      // questionContent = <EnhancedTable01 questions={questions} />;
      questionContent = <QuizBuilder questions={questions} />;
      console.log("questions QuizGen after are:", questions);
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{questionContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

QuizGen.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  question: state.question
});

export default connect(
  mapStateToProps,
  { getQuestions }
)(QuizGen);
