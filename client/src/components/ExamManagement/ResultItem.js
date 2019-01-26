import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

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
  componentDidMount() {
    console.log("examRunId is:", this.props.examresult.examRunId);
    console.log("examId is:", this.props.examresult.examId);

    this.props.getExam(this.props.examresult.examId);
    console.log("component did mount works-----------------");
  }

  render() {
    const {
      selectedExam,
      selectedAnswer,
      auth,
      examRunId,
      showActions
    } = this.props;
    console.log("buildExamResult is:", this.props.examresult);
    console.log("selectedExam in ExamRun is", selectedExam);
    console.log("ExamContent props are:", this.props);
    console.log("selectedAnswer in ExamRun is:", selectedAnswer);
    console.log("Current user(Student) ID is:", auth.user.id);

    let resultItemContent;
    resultItemContent = this.props.examresult.results.map(
      // resultItemContent = this.props.result.examresult[0].results.map(
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
          <p>Exam Title: {this.props.exam.exam.examName}</p>
          <p>Exam Instructor: {this.props.exam.exam.examOwner}</p>
          <p>
            Start Time:{" "}
            <Moment format="DD MMM YYYY (HH:mm)">
              {this.props.exam.exam.startTime}
            </Moment>
          </p>
          <p>
            Finish Time:{" "}
            <Moment format="DD MMM YYYY (HH:mm)">
              {this.props.exam.exam.finishTime}
            </Moment>
          </p>
          <p>Exam ID is: {this.props.examresult.examId}</p>
          <p>Exam Run ID is: {this.props.examresult.examRunId}</p>

          {resultItemContent}
          <Link
            to={{
              pathname: `/postfeed`,
              examId: `${this.props.examresult.examId}`
            }}
            className="btn btn btn-outline-warning"
          >
            Send Comment
          </Link>
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
  getExam: PropTypes.func.isRequired,
  examresult: PropTypes.object.isRequired,
  exam: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exam: state.exam
});

export default connect(
  mapStateToProps,
  { getExam }
)(ResultItem);
