import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import { getExam } from "../../actions/examActions";
import Moment from "react-moment";

class PostItem extends Component {
  componentDidMount() {
    console.log("The exam id is:", this.props.post.examId);
    // console.log("The exam id is:", this.props.exam.exams.selectedStuId);
    this.props.getExam(this.props.post.examId);
    console.log("Line 15-exam is:", this.props.exam);
  }
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    const { exam } = this.props.exam;
    console.log("Line 41-exam is:", exam);

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
            <Moment format="DD MMM YYYY HH:mm">{post.date}</Moment>
          </div>
          <div className="col-md-10">
            {/* <h5>Exam ID: {post.examId}</h5> */}
            <h5>Exam Title: {exam.examName}</h5>
            <h5>Exam Instructor: {exam.examOwner}</h5>
            <h5>
              Exam Start Date:{" "}
              <Moment format="DD MMM YYYY HH:mm">{exam.startTime}</Moment>
            </h5>
            <h5>
              Exam Finish Date:{" "}
              <Moment format="DD MMM YYYY HH:mm">{exam.finishTime}</Moment>
            </h5>
            {/* <h5>Exam Start Date: {exam.startTime}</h5>
            <h5>Exam Finish Date: {exam.finishTime}</h5> */}
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {/* {console.log("Line 86-post.name is:", post.name)}
                {console.log("Line 87-auth.user.name is:", auth.user.name)} */}
                {post.user === auth.user.id || auth.user.name === "admin" ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getExam: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  exam: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exam: state.exam
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike, getExam }
)(PostItem);
