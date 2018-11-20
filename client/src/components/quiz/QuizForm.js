import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { addReport } from "../../actions/reportActions";

class QuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsId: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newQuiz = {
      questionsId: this.state.questionsId
    };

    // this.props.addReport(reportFormData);

    this.setState({
      questionsId: []
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select questionss for quiz
    const questionValue = [
      { label: "* Select Food Type", value: 0 },
      { label: "Corn", value: "corn" },
      {
        label: "Duck pellet(sold online and at pet stores)",
        value: "duck pellet"
      },
      {
        label: "Lettuce, other greens(torn into small pieces)",
        value: "lettuce, other greens"
      },
      { label: "Frozen peas(defrosted)", value: "frozen peas" },
      { label: "Oats(rolled or instant)", value: "oats" },
      { label: "Seeds(including birdseed or other varieties)", value: "seeds" },
      { label: "Bread", value: "bread" },
      { label: "Other", value: "other" }
    ];
    // Select options for food kind
    const foodKinds = [
      { label: "* Select Food Kind", value: 0 },
      { label: "Fresh", value: "fresh" },
      { label: "Frozen", value: "frozen" },
      { label: "Canned", value: "canned" },
      { label: "Other", value: "other" }
    ];

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Input your data please
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="* What time the ducks are fed"
                  name="fedDate"
                  type="date"
                  value={this.state.fedDate}
                  onChange={this.onChange}
                  error={errors.fedDate}
                  info="The time that the ducks were fed in this report"
                />
                <SelectListGroup
                  placeholder="* What food the ducks are fed"
                  name="foodType"
                  value={this.state.foodType}
                  onChange={this.onChange}
                  options={foodTypes}
                  error={errors.foodType}
                  //info="Food type"
                />
                <TextFieldGroup
                  placeholder="* Where the ducks are fed"
                  name="where"
                  value={this.state.where}
                  onChange={this.onChange}
                  error={errors.where}
                  disabled={false}
                  // info="Where fed the ducks"
                />
                <TextFieldGroup
                  placeholder="* How many ducks are fed"
                  name="howManyDucks"
                  type="number"
                  value={this.state.howManyDucks}
                  onChange={this.onChange}
                  error={errors.howManyDucks}
                  // info="Could be your own website or a company one"
                />
                <SelectListGroup
                  placeholder="* What kind of food the ducks are fed"
                  name="foodKind"
                  value={this.state.foodKind}
                  onChange={this.onChange}
                  options={foodKinds}
                  error={errors.foodKind}
                  //info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="* How much food the ducks are fed"
                  name="howMuchFood"
                  type="number"
                  value={this.state.howMuchFood}
                  onChange={this.onChange}
                  error={errors.howMuchFood}
                  info="Grams"
                />
                <TextFieldGroup
                  placeholder=" Pick image"
                  type="file"
                  onChange={this.fileSelectedHandler.bind(this)}
                  error={errors.reportImage}
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
QuizForm.propTypes = {
  addReport: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addReport }
)(QuizForm);
