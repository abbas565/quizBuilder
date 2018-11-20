import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectQuestion } from "../../actions/quizActions";
import Moment from "react-moment";
import isEmpty from "./../../validation/is-empty";
import TextFieldGroup from "../common/TextFieldGroup";

class QuizFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsId: [],
      errors: {}
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = id => {
    let index = this.state.questionsId.indexOf(id);
    this.setState({
      questionsId:
        index != -1
          ? this.state.questionsId.splice(index, 1)
          : this.state.questionsId.push(id)

      // if ({this.state.questionsId.indexOf(id)} != -1) {
      //   console.log(index);
      //   this.setState({ questionsId: this.state.questionsId.splice(index, 1) });
      //   console.log("questions id are:", this.state.questionsId);
      // } else {
      //   this.setState({ questionsId: this.state.questionsId.push(id) });
      //   // this.setState({ questionsId: [...this.state.questionsId, id] });
      //   console.log("questions id are:", this.state.questionsId);
      // }

      // this.setState({ questionsId: [...this.state.questionsId, id] });
      // console.log("questions id are:", this.state.questionsId);
      // console.log("question id is:", id);
      // this.props.selectQuestion(id);
    });
    console.log("questions id are:", this.state.questionsId);
    console.log("question id is:", id);
  };

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  render() {
    const { questions, auth } = this.props;
    console.log("user name:", auth.user.name);
    const authName = auth.user.name;

    // <form onSubmit={this.onSubmit}>
    //   <div className="form-group">
    const questionSum = questions.map(qus => (
      <tr key={qus._id}>
        <td>{qus.mainText.trim().slice(0, 20) + " . . . ."}</td>
        <td>{qus.courseLevel}</td>
        <td>
          {!isEmpty(qus.questionImage) ? (
            <img
              className="questionImgSmall"
              src={"../" + qus.questionImage}
              alt="Question Image"
            />
          ) : (
            <p>No Image</p>
          )}
        </td>

        <td>
          <TextFieldGroup
            // placeholder="* What time the ducks are fed"
            name={`${qus._id}`}
            type="checkbox"
            value={qus._id}
            lable="Selected"
            onChange={this.onSelect.bind(this, qus._id)}
            // error={errors.selected}
            info="The selected question"
          />
        </td>
        <td>
          <Link to={`/questions/${qus._id}`} className="btn btn-info">
            View Question
          </Link>
        </td>
      </tr>
    ));
    //   </div>
    // </form>;

    return (
      <div>
        <h4 className="mb-4">Quiz</h4>
        <table className="table">
          <thead>
            <tr>
              {/* <th>Date</th> */}
              <th>Question</th>
              <th>Course Level</th>
              <th>Image</th>
              <th />
            </tr>
            {questionSum}
          </thead>
        </table>
      </div>
    );
  }
}

QuizFeed.propTypes = {
  selectQuestion: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { selectQuestion }
)(QuizFeed);

{
  /* <button
            onClick={this.onSelect.bind(this, qus._id)}
            className="btn btn-danger"
            // disabled={authName !== "admin" ? true : false}
          >
            Select Question
          </button> */
}

{
  /* <input
            type="checkbox"
            id="selected"
            name={`${qus._id}`}
            value="selected"
            onChange={this.onChange}
          />
          <label for="selected">Selected</label> */
}

{
  /* <input type="radio" id="incorrect" name="answer" value="incorrect" />
          <label for="incorrect">Incorrect</label> */
}
