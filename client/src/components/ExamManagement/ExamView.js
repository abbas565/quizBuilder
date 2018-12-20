import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ExamItem from "./ExamItem";
import Spinner from "../common/Spinner";
import { getExam } from "../../actions/examActions";

class ExamView extends Component {
  componentDidMount() {
    console.log("The exam id is:", this.props.match.params.id);
    // console.log("The exam id is:", this.props.exam.exams.selectedStuId);
    this.props.getExam(this.props.match.params.id);
  }

  render() {
    const { exam, loading } = this.props.exam;
    let examContent;

    if (exam === null || loading || Object.keys(exam).length === 0) {
      examContent = <Spinner />;
    } else {
      examContent = (
        <div>
          <ExamItem exam={exam} showActions={false} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/examsview" className="btn btn-light mb-3">
                Back To Exams
              </Link>
              {examContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExamView.propTypes = {
  getExam: PropTypes.func.isRequired,
  exam: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  exam: state.exam
});

export default connect(
  mapStateToProps,
  { getExam }
)(ExamView);
