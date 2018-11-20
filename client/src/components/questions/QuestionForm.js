import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { addQuestion } from "../../actions/questionActions";

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainText: "",
      referenceBook: "",
      answerText01: "",
      answerCorrect01: "",
      answerText02: "",
      answerCorrect02: "",
      answerText03: "",
      answerCorrect03: "",
      answerText04: "",
      answerCorrect04: "",
      courseId: "",
      courseLevel: "",
      questionImage: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    var questionFormData = new FormData();
    questionFormData.set("mainText", this.state.mainText);
    questionFormData.set("referenceBook", this.state.referenceBook);
    questionFormData.set("answerText01", this.state.answerText01);
    questionFormData.set("answerCorrect01", this.state.answerCorrect01);
    questionFormData.set("answerText02", this.state.answerText02);
    questionFormData.set("answerCorrect02", this.state.answerCorrect02);
    questionFormData.set("answerText03", this.state.answerText03);
    questionFormData.set("answerCorrect03", this.state.answerCorrect03);
    questionFormData.set("answerText04", this.state.answerText04);
    questionFormData.set("answerCorrect04", this.state.answerCorrect04);
    questionFormData.set("courseId", this.state.courseId);
    questionFormData.set("courseLevel", this.state.courseLevel);
    questionFormData.set("name", user.name);
    questionFormData.set("avatar", user.avatar);

    if (this.state.questionImage) {
      questionFormData.append(
        "questionImage",
        this.state.questionImage,
        this.state.questionImage.name
      );
    }

    console.log(
      "question data that posted(form):",
      questionFormData.get("mainText")
    );
    console.log(
      "question image that posted(form):",
      questionFormData.get("questionImage")
    );

    console.log("Uploaded image state is:", this.state.questionImage);

    this.props.addQuestion(questionFormData);

    this.setState({
      mainText: "",
      referenceBook: "",
      answerText01: "",
      answerCorrect01: "",
      answerText02: "",
      answerCorrect02: "",
      answerText03: "",
      answerCorrect03: "",
      answerText04: "",
      answerCorrect04: "",
      courseId: "",
      courseLevel: "",
      questionImage: null
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  fileSelectedHandler(e) {
    this.setState({ questionImage: e.target.files[0] });
    console.log("Uploaded file is:", e.target.files[0]);
  }

  render() {
    const { errors } = this.state;

    // Select options for answer state
    const answerCorrect = [
      { label: "* Choose answer state", value: 0 },
      { label: "Correct", value: "true" },
      { label: "In Correct", value: "false" }
    ];

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Input your question please
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="* Question text..."
                  name="mainText"
                  value={this.state.mainText}
                  onChange={this.onChange}
                  error={errors.mainText}
                  info="The question ......."
                />
                <TextFieldGroup
                  placeholder="* Reference Book ..."
                  name="referenceBook"
                  type="text"
                  value={this.state.referenceBook}
                  onChange={this.onChange}
                  error={errors.referenceBook}
                  info="The Reference Book ......."
                />
                <TextFieldGroup
                  placeholder="* Answer One ..."
                  name="answerText01"
                  type="text"
                  value={this.state.answerText01}
                  onChange={this.onChange}
                  error={errors.answerText01}
                  info="The Answer One  ......."
                />
                <SelectListGroup
                  placeholder="* Answer One True/False"
                  name="answerCorrect01"
                  value={this.state.answerCorrect01}
                  onChange={this.onChange}
                  options={answerCorrect}
                  error={errors.answerCorrect01}
                  //info="Answer status........."
                />
                <TextFieldGroup
                  placeholder="* Answer Two ..."
                  name="answerText02"
                  type="text"
                  value={this.state.answerText02}
                  onChange={this.onChange}
                  error={errors.answerText02}
                  info="The Answer One  ......."
                />
                <SelectListGroup
                  placeholder="* Answer Two True/False"
                  name="answerCorrect02"
                  value={this.state.answerCorrect02}
                  onChange={this.onChange}
                  options={answerCorrect}
                  error={errors.answerCorrect02}
                  //info="Answer status........."
                />
                <TextFieldGroup
                  placeholder="* Answer Three ..."
                  name="answerText03"
                  type="text"
                  value={this.state.answerText03}
                  onChange={this.onChange}
                  error={errors.answerText03}
                  info="The Answer One  ......."
                />
                <SelectListGroup
                  placeholder="* Answer Three True/False"
                  name="answerCorrect03"
                  value={this.state.answerCorrect03}
                  onChange={this.onChange}
                  options={answerCorrect}
                  error={errors.answerCorrect03}
                  //info="Answer status........."
                />
                <TextFieldGroup
                  placeholder="* Answer four ..."
                  name="answerText04"
                  type="text"
                  value={this.state.answerText04}
                  onChange={this.onChange}
                  error={errors.answerText04}
                  info="The Answer One  ......."
                />
                <SelectListGroup
                  placeholder="* Answer four True/False"
                  name="answerCorrect04"
                  value={this.state.answerCorrect04}
                  onChange={this.onChange}
                  options={answerCorrect}
                  error={errors.answerCorrect04}
                  //info="Answer status........."
                />

                <TextFieldGroup
                  placeholder="* Course ID"
                  name="courseId"
                  type="text"
                  value={this.state.courseId}
                  onChange={this.onChange}
                  error={errors.courseId}
                  info="Course ID ....."
                />
                <TextFieldGroup
                  placeholder="* Course Level"
                  name="courseLevel"
                  type="text"
                  value={this.state.courseLevel}
                  onChange={this.onChange}
                  error={errors.courseLevel}
                  info="Course Level ....."
                />
                <TextFieldGroup
                  placeholder=" Pick image"
                  type="file"
                  onChange={this.fileSelectedHandler.bind(this)}
                  error={errors.questionImage}
                  info="Image format jpeg, jpg, png or gif and size less than 500 KB"
                />
              </div>

              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
QuestionForm.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addQuestion }
)(QuestionForm);
