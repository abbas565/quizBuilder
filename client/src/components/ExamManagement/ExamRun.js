import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";
import QuestionView from "../question/QuestionView";
import CheckBoxList from "../common/CheckBoxList";
import ExamContent from "./ExamContent";

class ExamRun extends Component {
  render() {
    const { exam, quiz, auth, showActions } = this.props;
    console.log("exam in ExamRun is", exam);
    console.log("ExamRun props are:", this.props);
    console.log("Exam ID is:", this.props.location.examId);
    let sExam;
    let sAnswers;
    exam.exams.forEach(pexam => {
      if (pexam._id == this.props.location.examId) {
        console.log("Selected exam is", pexam);
        console.log(
          "Selected answer are",
          pexam.qExam.sQuestions.map(ques => ques.answers)
        );
        sExam = pexam;
        sAnswers = pexam.qExam.sQuestions.map(ques => ques.answers);
      }
    });
    console.log("sExam in ExamRun is", sExam);
    console.log("sAnswers in ExamRun are", sAnswers);
    let quizContent;
    quizContent = (
      <ExamContent selectedExam={sExam} selectedAnswer={sAnswers} />
    );

    return (
      <div>
        <h4 className="mb-4">Physics Exam...........</h4>
        <div>{quizContent}</div>
      </div>
    );
  }
}

ExamRun.defaultProps = {
  showActions: true
};

ExamRun.propTypes = {
  //   quiz: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exam: state.exam
  // question: state.question
});

export default connect(mapStateToProps)(ExamRun);
