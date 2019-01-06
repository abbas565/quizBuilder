import React from "react";
import classnames from "classnames";
// import Checkbox from "@material-ui/core/Checkbox";

class ResultIcon extends React.Component {
  render() {
    return (
      <div>
        {this.props.resultpoint == -1 ? (
          <div>
            <i
              className={classnames("fas fa-thumbs-down", {
                "text-info": "Correct Answer" //this.findUserLike(post.likes)
              })}
            />
            <i
              className={classnames("fas fa-thumbs-up", {
                "text-info": "Correct Answer" //this.findUserLike(post.likes)
              })}
            />
          </div>
        ) : this.props.resultpoint == 0 ? (
          <div>
            <i
              className={classnames("fas fa-thumbs-down", {
                "text-info": "Correct Answer" //this.findUserLike(post.likes)
              })}
            />
            <i
              className={classnames("fas fa-thumbs-down", {
                "text-info": "Correct Answer" //this.findUserLike(post.likes)
              })}
            />
          </div>
        ) : this.props.resultpoint == 1 ? (
          <div>
            <i
              className={classnames("fas fa-thumbs-up", {
                "text-info": "Correct Answer" //this.findUserLike(post.likes)
              })}
            />
            <i
              className={classnames("fas fa-thumbs-up", {
                "text-info": "Correct Answer" //this.findUserLike(post.likes)
              })}
            />
          </div>
        ) : (
          <div>
            <i
              className={classnames("fas fa-thumbs-up", {
                "text-info": "Correct Answer" //this.findUserLike(post.likes)
              })}
            />
            <i
              className={classnames("fas far fa-angry", {
                "text-info": "Correct Answer" //this.findUserLike(post.likes)
              })}
            />
          </div>
        )}
        {/* <Checkbox checked color="primary" value="checkedE" /> */}
        {/* <i
          className={classnames("fas fa-thumbs-up", {
            "text-info": "Correct Answer" //this.findUserLike(post.likes)
          })}
        />
        <i
          className={classnames("far fa-angry", {
            "text-info": "Correct Answer" //this.findUserLike(post.likes)
          })}
        /> */}
        {/* <Checkboxes /> */}
        {/* <Checkbox checked color="green" value="checkedE" />
        <Checkbox checked color={green} value="checkedE" /> */}
        {/* <Checkbox disabled checked value="checkedE" /> */}
        {/* <Checkbox checked color="primary" value="checkedE" /> */}
      </div>
    );
  }
}

export default ResultIcon;
