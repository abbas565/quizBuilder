import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { buildExamResult, getExamResult } from "../../actions/resultActions";
import { getExam } from "../../actions/examActions";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";
import QuestionView from "../question/QuestionView";
import CheckBoxList from "../common/CheckBoxList";

class ResultView extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       examresults: [],
  //       errors: {}
  //     };

  //     // this.handleFormSubmit = this.handleFormSubmit.bind(this);
  //     // this.handleToggle = this.handleToggle.bind(this);
  //   }
  componentDidMount() {
    this.props.getExamResult(this.props.location.examId);
    this.props.getExam(this.props.result.examresults[0].examId);
    console.log("component did mount works-----------------");
    // this.props.getStuExams(this.props.match.params.id);
  }

  //   handleFormSubmit = formSubmitEvent => {
  //     formSubmitEvent.preventDefault();

  //     const { user } = this.props.auth;
  //     const { selectedExam, examRunId } = this.props;

  //     const newExamId = {
  //       examId: selectedExam._id,
  //       studentId: user.id,
  //       examRunId: examRunId
  //     };
  //     console.log("formsubmit in ExamContent is working!");
  //     // console.log("selected is:", this.state.selected);
  //     // console.log("selectedQueId is:", this.state.selectedQueId);
  //     // console.log("sQuestions are:", this.state.sQuestions);
  //     console.log("newExamId in ExamContent:", newExamId);
  //     this.props.buildExamResult(newExamId);

  //     // this.setState({
  //     //   quizName: "",
  //     //   selected: [],
  //     //   selectedQueId: [],
  //     //   sQuestions: [],
  //     //   quizOwner: ""
  //     // });

  //     // this.forceUpdate();
  //   };

  render() {
    const {
      selectedExam,
      selectedAnswer,
      auth,
      examRunId,
      showActions
    } = this.props;
    console.log("buildExamResult is:", this.props.result);
    console.log("selectedExam in ExamRun is", selectedExam);
    console.log("ExamContent props are:", this.props);
    console.log("selectedAnswer in ExamRun is:", selectedAnswer);
    console.log("Current user(Student) ID is:", auth.user.id);

    let resultViewContent;
    resultViewContent = this.props.result.examresults[0].results.map(result => (
      <ul>
        <li>{result.questionId}</li>
        <li>{result.answerSelectPass.answer01pass}</li>
        <li>{result.answerSelectPass.answer02pass}</li>
        <li>{result.answerSelectPass.answer03pass}</li>
        <li>{result.answerSelectPass.answer04pass}</li>
      </ul>
      // <CheckBoxList
      //   items={[
      //     sQ.answers.answer01.ansText,
      //     sQ.answers.answer02.ansText,
      //     sQ.answers.answer03.ansText,
      //     sQ.answers.answer04.ansText
      //   ]}
      //   title={sQ.mainText}
      //   key={sQ._id}
      //   questionId={sQ._id}
      //   questionType={sQ.questionType}
      //   examId={selectedExam._id}
      //   studentId={auth.user.id}
      //   examRunId={examRunId}
      // />
    ));

    return (
      <div>
        <div>
          {/* <form onSubmit={this.handleFormSubmit}> */}
          {resultViewContent}
          {/* <button className="btn btn-success" type="submit">
              Submit Exam
            </button>
            <Link
              to={{
                pathname: `/feed`,
                examId: `${selectedExam._id}`
              }}
              className="btn btn btn-outline-warning"
            >
              Send Comment
            </Link> */}
          <h1>ResultView worked!!!!</h1>

          {/* <Link
            to={{
              pathname: `/resultview`,
              examId: `${examRunId}`
            }}
            className={
              "btn btn-outline-primary "
              // new Date().getTime() < Date.parse(n.startTime) ||
              // new Date().getTime() < Date.parse(n.finishTime)
              //   ? "btn btn-outline-primary " //disabled-link"
              //   : "btn btn-outline-primary"
            }
          >
            Show Result
          </Link> */}
          {/* </form> */}
        </div>
      </div>
    );
  }
}

ResultView.defaultProps = {
  showActions: true
};

ResultView.propTypes = {
  auth: PropTypes.object.isRequired,
  buildExamResult: PropTypes.func.isRequired,
  getExamResult: PropTypes.func.isRequired,
  getExam: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  exam: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  result: state.result,
  exam: state.exam
});

export default connect(
  mapStateToProps,
  { buildExamResult, getExamResult, getExam }
)(ResultView);
