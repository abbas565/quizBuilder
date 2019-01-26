import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { buildQuestionResult } from "../../actions/resultActions";
import SaveButton from "./SaveButton";

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: "",
    answerDescript: "",
    errors: {}
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
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
      answerDescript: this.state.answerDescript,
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
      <div className={classes.root}>
        <form onSubmit={this.handleFormSubmit}>
          <FormControl component="fieldset" className={classes.formControl}>
            <h2>{this.props.title}</h2>
            <RadioGroup
              aria-label="Question"
              name="question"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value={this.props.items[0]}
                control={<Radio />}
                label={this.props.items[0]}
              />
              <FormControlLabel
                value={this.props.items[1]}
                control={<Radio />}
                label={this.props.items[1]}
              />
              <FormControlLabel
                value={this.props.items[2]}
                control={<Radio />}
                label={this.props.items[2]}
              />
              <FormControlLabel
                value={this.props.items[3]}
                control={<Radio />}
                label={this.props.items[3]}
              />
            </RadioGroup>
            {/* <button className="btn btn-primary" type="submit">
              Save Answer
            </button> */}
            <SaveButton />
          </FormControl>
        </form>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
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
)(withStyles(styles)(RadioButtonsGroup));
