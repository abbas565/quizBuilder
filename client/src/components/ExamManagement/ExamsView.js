import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ExamFeed from "./ExamFeed";
import Spinner from "../common/Spinner";
import { getExams } from "../../actions/examActions";

class ExamsView extends Component {
  componentDidMount() {
    this.props.getExams();
    // this.props.getStuExams(this.props.match.params.id);
  }

  render() {
    console.log("this.props.exam:", this.props.exams);
    const { exams, loading } = this.props.exam;
    let examContent;

    if (exams === null || loading) {
      examContent = <Spinner />;
    } else {
      examContent = <ExamFeed exams={exams} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{examContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

ExamsView.propTypes = {
  getExams: PropTypes.func.isRequired,
  exam: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  exam: state.exam
});

export default connect(
  mapStateToProps,
  { getExams }
)(ExamsView);
