import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { buildQuestionResult } from "../../actions/resultActions";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class AnswerTextField extends React.Component {
  state = {
    answer: ""
  };

  handleChange = answer => event => {
    this.setState({
      [answer]: event.target.value
    });
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    const { user } = this.props.auth;
    const {
      examId,
      studentId,
      questionId,
      examRunId,
      questionType,
      items,
      title
    } = this.props;

    const newQuestionAnswer = {
      questionId: questionId,
      examId: examId,
      examRunId: examRunId,
      studentId: studentId,
      items: items,
      title: title,
      selectedAnswers: this.state.value,
      answerDescript: this.state.answer,
      questionType: questionType
    };
    console.log("formsubmit in RaidoButtonsGroup is working!");
    // console.log("selected is:", this.state.selected);
    // console.log("selectedQueId is:", this.state.selectedQueId);
    // console.log("sQuestions are:", this.state.sQuestions);
    console.log("newQuestionAnswer in CheckBoxList:", newQuestionAnswer);
    this.props.buildQuestionResult(newQuestionAnswer);

    // this.setState({
    //   checked: [],
    //   answerDescript: "",
    //   errors: {}
    // });
  };

  render() {
    const { classes } = this.props;

    return (
      <form
        onSubmit={this.handleFormSubmit}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-textarea"
          label="Answer"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          value={this.state.answer}
          onChange={this.handleChange("answer")}
          margin="normal"
          variant="outlined"
          style={{ margin: 8 }}
        />
        <button className="btn btn-primary" type="submit">
          Save Answer
        </button>
      </form>
    );
  }
}

AnswerTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  buildQuestionResult: PropTypes.func.isRequired,
  // items: PropTypes.arrey.isRequired,
  // key: PropTypes.string.isRequired,
  questionType: PropTypes.number.isRequired,
  questionId: PropTypes.string.isRequired,
  examId: PropTypes.string.isRequired,
  examRunId: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { buildQuestionResult }
)(withStyles(styles)(AnswerTextField));
