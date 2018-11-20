import React, { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "../common/CheckBox";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { buildQuiz } from "../../actions/quizActions";

class QuizBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizName: "",
      itemLables: [],
      selectedQue: [],
      selectedQueId: [],
      errors: {}
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount = () => {
    console.log("props are:", this.props.questions);
    console.log("itemLables was:", this.state.itemLables);

    this.setState({
      itemLables: this.props.questions.map(
        itemDetail => itemDetail.mainText.trim().slice(0, 40) + " . . . ."
      )
    });
    console.log("itemLables is:", this.state.itemLables);
    this.selectedCheckboxes = new Set();
  };

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    const { user } = this.props.auth;

    for (const checkbox of this.selectedCheckboxes) {
      // console.log(checkbox, "is selected.");
      // console.log("type of:", typeof checkbox);
      this.setState(
        (this.state.selectedQue = [...this.state.selectedQue, checkbox])
      );
      this.props.questions.forEach(que => {
        if (que.mainText.trim().slice(0, 40) + " . . . ." == checkbox) {
          this.state.selectedQueId = [...this.state.selectedQueId, que._id];
        }
      });
    }

    const newQuiz = {
      quizName: this.state.quizName,
      selectedQueId: this.state.selectedQueId,
      name: user.name,
      avatar: user.avatar
    };

    console.log("selectedQue is:", this.state.selectedQue);
    console.log("selectedQueId is:", this.state.selectedQueId);
    console.log("newQuiz in QuizBulder:", newQuiz);
    this.props.buildQuiz(newQuiz);

    this.setState({
      quizName: "",
      itemLables: [],
      selectedQue: [],
      selectedQueId: []
    });
  };

  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  createCheckboxes = () => this.state.itemLables.map(this.createCheckbox);

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    console.log("itemLables array is:", this.state.itemLables);
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <TextFieldGroup
            placeholder="* Enter Quiz Name Please"
            name="quizName"
            type="text"
            value={this.state.quizName}
            onChange={this.onChange}
            error={errors.quizName}
            info="The Quiz Name"
          />
          {this.createCheckboxes()}

          <button className="btn btn-default" type="submit">
            Submit Quiz
          </button>
        </form>
      </div>
    );
  }
}

//------Connect to redux
QuizBuilder.propTypes = {
  buildQuiz: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { buildQuiz }
)(QuizBuilder);

//--------------

// export default QuizBuilder;
