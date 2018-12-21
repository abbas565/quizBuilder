import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";
import QuestionView from "../question/QuestionView";
import CheckBoxList from "../common/CheckBoxList";

class ExamContent extends Component {
  render() {
    const { selectedExam, selectedAnswer, auth, showActions } = this.props;
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
      />
    ));

    return (
      <div>
        <div>{examContent}</div>
      </div>
    );
  }
}

ExamContent.defaultProps = {
  showActions: true
};

ExamContent.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ExamContent);
