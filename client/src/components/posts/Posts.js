import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { getPosts, getPostsExamId } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    // this.props.getPostsExamId(this.props.location.examId);
    console.log("Line 12-componentDidMount works............");
    console.log("Line 13-this.props.location.examId is:", this.props);
    this.props.location.examId
      ? this.props.getPostsExamId(this.props.location.examId)
      : this.props.getPostsExamId(this.props.post.posts[0].examId);
    // this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    console.log("Line 17-posts props are:", this.props);
    console.log("Line 18-Exam ID is:", this.props.location.examId);
    console.log("Line 18-selectedExam is:", this.props.location.selectedExam);
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <PostFeed posts={posts} />
        // <PostFeed posts={posts} examId={this.props.location.examId} />
      );
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm
                examId={this.props.location.examId}
                selectedExam={this.props.location.selectedExam}
              />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPostsExamId: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostsExamId, getPosts }
)(Posts);
