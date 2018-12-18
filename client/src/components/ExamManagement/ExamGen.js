import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ExamBuilder from "./ExamBuilder";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";

class ExamGen extends Component {
  componentWillMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    console.log("profile init ExamGen are:", this.props.profile);

    let profileContent;

    if (profiles === null || loading || profiles === undefined) {
      profileContent = <Spinner />;
    } else {
      console.log("profiles ExamGen befor are:", profiles);
      // profileContent = <EnhancedTable01 profiles={profiles} />;
      profileContent = <ExamBuilder profiles={profiles} />;
      console.log("profiles ExamGen after are:", profiles);
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

ExamGen.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(ExamGen);
