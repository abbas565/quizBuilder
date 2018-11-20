import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { addReport } from "../../actions/reportActions";

class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fedDate: "",
      foodType: "",
      where: "",
      howManyDucks: "",
      foodKind: "",
      howMuchFood: "",
      reportImage: null,
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

    // const newReport = {
    //   text: this.state.text,
    //   fedDate: this.state.fedDate,
    //   foodType: this.state.foodType,
    //   where: this.state.where,
    //   howManyDucks: this.state.howManyDucks,
    //   foodKind: this.state.foodKind,
    //   howMuchFood: this.state.howMuchFood,
    //   name: user.name,
    //   avatar: user.avatar
    // };

    // const newImage = {
    //   reportImage: this.state.reportImage
    // };

    var reportFormData = new FormData();
    reportFormData.set("text", this.state.text);
    reportFormData.set("fedDate", this.state.fedDate);
    reportFormData.set("foodType", this.state.foodType);
    reportFormData.set("where", this.state.where);
    reportFormData.set("howManyDucks", this.state.howManyDucks);
    reportFormData.set("foodKind", this.state.foodKind);
    reportFormData.set("howMuchFood", this.state.howMuchFood);
    reportFormData.set("name", user.name);
    reportFormData.set("avatar", user.avatar);

    if (this.state.reportImage) {
      reportFormData.append(
        "reportImage",
        this.state.reportImage,
        this.state.reportImage.name
      );
    }

    console.log(
      "report data that posted(form):",
      reportFormData.get("fedDate")
    );
    console.log(
      "report image that posted(form):",
      reportFormData.get("reportImage")
    );

    console.log("Uploaded image state is:", this.state.reportImage);

    this.props.addReport(reportFormData);

    this.setState({
      fedDate: "",
      foodType: "",
      where: "",
      howManyDucks: "",
      foodKind: "",
      howMuchFood: "",
      reportImage: null
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  fileSelectedHandler(e) {
    this.setState({ reportImage: e.target.files[0] });
    console.log("Uploaded file is:", e.target.files[0]);
  }

  render() {
    const { errors } = this.state;

    // Select options for food types
    const foodTypes = [
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
ReportForm.propTypes = {
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
)(ReportForm);
