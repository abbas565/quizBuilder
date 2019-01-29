import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ExamFeed from "../ExamManagement/ExamFeed";
import Spinner from "../common/Spinner";
import { getExams } from "../../actions/examActions";
import HorizontalLinearStepper from "../common/HorizontalLinearStepper";

class OneDimMot extends Component {
  componentDidMount() {
    this.props.getExams();
    // this.props.getStuExams(this.props.match.params.id);
  }

  render() {
    const { exams, loading } = this.props.exam;
    console.log("this.props.exam.exams:", exams);
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
            <div className="col-sm-6">
              <h1 className="display-4">Mechanics</h1>
              <h3 className="display-8">One-Dimensional Motion</h3>
            </div>
            <div className="col-sm-6">
              <h3 className="display-6">Student progress in this subject</h3>
              <HorizontalLinearStepper />
            </div>
            <div className="col-md-12">{examContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

OneDimMot.propTypes = {
  getExams: PropTypes.func.isRequired,
  exam: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  exam: state.exam
});

export default connect(
  mapStateToProps,
  { getExams }
)(OneDimMot);
