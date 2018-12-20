import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ExamBuilder from "./ExamBuilder";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import { getQuiz } from "../../actions/quizActions";

class ExamGen extends Component {
  componentWillMount() {
    this.props.getProfiles();
    console.log("The quiz id in examGen is:", this.props);
    // let qExam;
    // this.props.quiz.quizzes.forEach(q => {
    //   if (q._id === this.props.location.quizId) {
    //     qExam = q;
    //     console.log("qExam is", qExam);
    //   }
    // });
    // this.props.getQuiz(this.props.match.params.id);
  }

  render() {
    const { profiles, loading } = this.props.profile;
    console.log("profile init ExamGen are:", this.props.profile);

    let profileContent;

    if (profiles === null || loading || profiles === undefined) {
      profileContent = <Spinner />;
    } else {
      console.log("profiles ExamGen befor are:", profiles);
      //-----Passing selected quiz to ExamBuilder------------
      let qExam;
      this.props.quiz.quizzes.forEach(q => {
        if (q._id === this.props.location.quizId) {
          qExam = q;
          console.log("qExam is", qExam);
        }
      });
      //------------------------------------------------------
      profileContent = <ExamBuilder profiles={profiles} qExam={qExam} />;
      console.log("profiles ExamGen after are:", profiles);
      console.log("Line 36-qExam is:", qExam);
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

ExamGen.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  // getQuiz: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  quiz: state.quiz
});

const mapDispatchToProps = { getProfiles };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamGen);
