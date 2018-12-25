import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { buildExamResult } from "../../actions/resultActions";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";
import QuestionView from "../question/QuestionView";
import CheckBoxList from "../common/CheckBoxList";

class ExamContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examresults: [],
      errors: {}
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    // this.handleToggle = this.handleToggle.bind(this);
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    const { user } = this.props.auth;
    const { selectedExam, examRunId } = this.props;

    const newExamId = {
      examId: selectedExam._id,
      studentId: user.id,
      examRunId: examRunId
    };
    console.log("formsubmit in ExamContent is working!");
    // console.log("selected is:", this.state.selected);
    // console.log("selectedQueId is:", this.state.selectedQueId);
    // console.log("sQuestions are:", this.state.sQuestions);
    console.log("newExamId in ExamContent:", newExamId);
    this.props.buildExamResult(newExamId);

    // this.setState({
    //   quizName: "",
    //   selected: [],
    //   selectedQueId: [],
    //   sQuestions: [],
    //   quizOwner: ""
    // });

    // this.forceUpdate();
  };

  render() {
    const {
      selectedExam,
      selectedAnswer,
      auth,
      examRunId,
      showActions
    } = this.props;
    console.log("selectedExam in ExamRun is", selectedExam);
    console.log("ExamContent props are:", this.props);
    console.log("selectedAnswer in ExamRun is:", selectedAnswer);
    console.log("Current user(Student) ID is:", auth.user.id);

    let examContent;
    examContent = selectedExam.qExam.sQuestions.map(sQ => (
      <CheckBoxList
        items={[
          sQ.answers.answer01.ansText,
          sQ.answers.answer02.ansText,
          sQ.answers.answer03.ansText,
          sQ.answers.answer04.ansText
        ]}
        title={sQ.mainText}
        key={sQ._id}
        questionId={sQ._id}
        examId={selectedExam._id}
        studentId={auth.user.id}
        examRunId={examRunId}
      />
    ));

    return (
      <div>
        <div>
          <form onSubmit={this.handleFormSubmit}>
            {examContent}
            <button className="btn btn-default" type="submit">
              Submit Exam
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ExamContent.defaultProps = {
  showActions: true
};

ExamContent.propTypes = {
  auth: PropTypes.object.isRequired,
  buildExamResult: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { buildExamResult }
)(ExamContent);
