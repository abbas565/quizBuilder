import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import QuestionForm from "./QuestionForm";
import { getQuestions } from "../../actions/questionActions";

class QuestionsGen extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }

  render() {
    const { questions, loading } = this.props.question;

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <QuestionForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

QuestionsGen.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  question: state.question
});

export default connect(
  mapStateToProps,
  { getQuestions }
)(QuestionsGen);
