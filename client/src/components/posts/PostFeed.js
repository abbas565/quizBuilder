import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts, examId } = this.props;
    console.log("this.props is:", this.props);
    // <h2>{this.props.examId}</h2>;

    return (
      <div>
        {/* <h2>Exam ID is: {this.props.examId}</h2> */}
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
          // <PostItem key={post._id} post={post} examId={examId} />
        ))}
      </div>
    );
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
  examId: PropTypes.string.isRequired
};

export default PostFeed;
