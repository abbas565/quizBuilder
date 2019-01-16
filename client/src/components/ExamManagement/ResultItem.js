import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { buildExamResult, getExamResult } from "../../actions/resultActions";
import { getExam } from "../../actions/examActions";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";
import QuestionView from "../question/QuestionView";
import CheckBoxList from "../common/CheckBoxList";
import Checkboxes from "../common/Checkboxes";
import Checkbox from "@material-ui/core/Checkbox";
import green from "@material-ui/core/colors/green";
import ResultIcon from "../common/ResultIcon";

class ResultItem extends Component {
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
    console.log("examRunId is:", this.props.location.examRunId);
    console.log("examId is:", this.props.location.examId);
    this.props.getExamResult(this.props.location.examRunId);
    console.log("this.props.getExamResult", this.props.result);
    // this.props.location.examId
    //   ? this.props.getExam(this.props.location.examId)
    //   : this.props.getExam(this.props.result.examresults[0].examId);
    this.props.getExam(this.props.result.examsresults[0].examId);
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

    let resultItemContent;
    resultItemContent = this.props.result.examsresults[0].results.map(
      // resultItemContent = this.props.result.results.map(

      result => (
        <div>
          <h2>{result.title}</h2>
          <ol>
            <li>
              <ResultIcon resultpoint={result.answerSelectPass.answer01pass} />
              {/* {result.answerSelectPass.answer01pass} */}
              <h3>{result.items[0]}</h3>
            </li>
            <li>
              <ResultIcon resultpoint={result.answerSelectPass.answer02pass} />
              {/* {result.answerSelectPass.answer02pass} */}
              <h3>{result.items[1]}</h3>
            </li>
            <li>
              <ResultIcon resultpoint={result.answerSelectPass.answer03pass} />
              {/* {result.answerSelectPass.answer03pass} */}
              <h3>{result.items[2]}</h3>
            </li>
            <li>
              <ResultIcon resultpoint={result.answerSelectPass.answer04pass} />
              {/* {result.answerSelectPass.answer04pass} */}
              <h3>{result.items[3]}</h3>
            </li>
          </ol>
          <p>{result.answerDescript}</p>
        </div>
      )
    );

    return (
      <div>
        <div>
          {/* <p>Exam ID:{this.props.exam._id}</p>
        <p>Exam Title: {this.props.exam.examName}</p>
        <p>Exam Instructor: {this.props.exam.examOwner}</p>
        <p>
          Start Time:{" "}
          <Moment format="DD MMM YYYY (HH:mm)">
            {this.props.exam.startTime}
          </Moment>
        </p>
        <p>
          Finish Time:{" "}
          <Moment format="DD MMM YYYY (HH:mm)">
            {this.props.exam.finishTime}
          </Moment>
        </p> */}

          {resultItemContent}
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
          <h1>ResultItem worked!!!!</h1>
        </div>
      </div>
    );
  }
}

ResultItem.defaultProps = {
  showActions: true
};

ResultItem.propTypes = {
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
)(ResultItem);
