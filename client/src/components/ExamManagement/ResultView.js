import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ExamItem from "./ExamItem";
import Spinner from "../common/Spinner";
import ResultItem from "./ResultItem";
import { getExamResult } from "../../actions/resultActions";

class ResultView extends Component {
  componentDidMount() {
    console.log("The examRunId id is:", this.props.location.examRunId);
    this.props.getExamResult(this.props.location.examRunId);
  }

  render() {
    const { examresult, loading } = this.props.result;
    console.log("result is:", this.props.result);
    let examResultContent;

    if (
      examresult === null ||
      loading ||
      Object.keys(examresult).length === 0
    ) {
      examResultContent = <Spinner />;
    } else {
      examResultContent = (
        <div>
          <ResultItem examresult={examresult[0]} showActions={false} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/resultsview" className="btn btn-light mb-3">
                Back To Results
              </Link>
              {examResultContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResultView.propTypes = {
  getExamResult: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  result: state.result
});

export default connect(
  mapStateToProps,
  { getExamResult }
)(ResultView);
