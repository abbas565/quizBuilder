import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { buildQuestionResult } from "../../actions/resultActions";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import TextAreaFieldGroup from "./TextAreaFieldGroup";
import RadioButtonsGroup from "./RadioButtonsGroup";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 1360,
    backgroundColor: theme.palette.background.paper
  }
});

class CheckboxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      answerDescript: "",
      errors: {}
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

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
      selectedAnswers: this.state.checked,
      answerDescript: this.state.answerDescript,
      questionType: questionType
    };
    console.log("formsubmit in checkBoxComonent is working!");
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
    const { classes, items, title, questionType } = this.props;
    console.log("checked in CheckBoxList", this.state.checked);
    console.log("Line 84- items are:", items);
    return (
      <List className={classes.root}>
        <form onSubmit={this.handleFormSubmit}>
          <h2>{title}</h2>

          {questionType == 1 ? (
            items.map(value => (
              <ListItem
                key={value}
                role={undefined}
                dense
                button
                onClick={this.handleToggle(value)}
              >
                <Checkbox
                  checked={this.state.checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={`Answer: ${value}`} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Comments">
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : questionType == 2 ? (
            // <RadioButtonsGroup items={items} title={title} />
            items.map(value => (
              <ListItem
                key={value}
                role={undefined}
                dense
                button
                onClick={this.handleToggle(value)}
              >
                <Checkbox
                  checked={this.state.checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={`Answer: ${value}`} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Comments">
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <TextAreaFieldGroup
              placeholder="* Type your answer here please"
              name="answerDescript"
              value={this.state.answerDescript}
              onChange={this.onChange}
              // error={errors.answerDescript}
              info="The descriptional answer"
            />
          )}

          {/* {items.map(value => (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value)}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`Answer: ${value}`} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))} */}
          {/* <TextAreaFieldGroup
            placeholder="* Type your answer here please"
            name="answerDescript"
            value={this.state.answerDescript}
            onChange={this.onChange}
            // error={errors.answerDescript}
            info="The descriptional answer"
          /> */}
          <button className="btn btn-primary" type="submit">
            Save Answer
          </button>
          {/* <button className="btn btn-outline-warning" type="submit">
            Send Comment
          </button> */}
        </form>
      </List>
    );
  }
}

CheckboxList.propTypes = {
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
)(withStyles(styles)(CheckboxList));

// export default withStyles(styles)(CheckboxList);
