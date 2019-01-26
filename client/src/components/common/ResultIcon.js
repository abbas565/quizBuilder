import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faCheck,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

class ResultIcon extends React.Component {
  render() {
    return (
      <div>
        {this.props.resultpoint == -1 ? (
          <div>
            <FontAwesomeIcon icon={faThumbsUp} color={"white"} />
            <FontAwesomeIcon icon={faThumbsDown} color={"red"} />
            {/* <FontAwesomeIcon icon={faThumbsUp} color={"green"} />
            <FontAwesomeIcon icon={faCheck} color={"green"} />
            <FontAwesomeIcon icon={faTimesCircle} color={"green"} /> */}
          </div>
        ) : this.props.resultpoint == 0 ? (
          <div>
            <FontAwesomeIcon icon={faThumbsDown} color={"white"} />
            <FontAwesomeIcon icon={faThumbsDown} color={"white"} />
            {/* <FontAwesomeIcon icon={faThumbsDown} color={"red"} />
            <FontAwesomeIcon icon={faCheck} color={"red"} />
            <FontAwesomeIcon icon={faTimesCircle} color={"red"} /> */}
          </div>
        ) : this.props.resultpoint == 1 ? (
          <div>
            <FontAwesomeIcon icon={faThumbsUp} color={"green"} />
            <FontAwesomeIcon icon={faThumbsUp} color={"green"} />
            {/* <FontAwesomeIcon icon={faCheck} color={"green"} />
            <FontAwesomeIcon icon={faTimesCircle} color={"green"} /> */}
          </div>
        ) : (
          <div>
            <FontAwesomeIcon icon={faThumbsUp} color={"green"} />
            <FontAwesomeIcon icon={faThumbsDown} color={"red"} />
            {/* <FontAwesomeIcon icon={faThumbsDown} color={"red"} />
            <FontAwesomeIcon icon={faCheck} color={"red"} />
            <FontAwesomeIcon icon={faTimesCircle} color={"red"} /> */}
          </div>
        )}
      </div>
    );
  }
}

export default ResultIcon;
