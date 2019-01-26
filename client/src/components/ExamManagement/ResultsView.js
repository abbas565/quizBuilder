import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ResultFeed from "./ResultFeed";
import Spinner from "../common/Spinner";
import { getExamsResults } from "../../actions/resultActions";

class ResultsView extends Component {
  componentDidMount() {
    this.props.getExamsResults();
  }

  render() {
    const { examsresults, loading } = this.props.result;
    console.log("this.props.result.examsresults:", examsresults);

    //-----------------------------------------------------------

    const removeItems = [];
    const remainItems = examsresults; //????????

    for (let i = 0; i < examsresults.length - 1; i++) {
      if (
        examsresults[i].examRunId == examsresults[i + 1].examRunId &&
        examsresults[i].date > examsresults[i + 1].date
      ) {
        removeItems.push(examsresults[i + 1]);
        // console.log("examsresults[i].date", examsresults[i].date);
        console.log("removeItems is:", removeItems);
      } else if (
        examsresults[i].examRunId == examsresults[i + 1].examRunId &&
        examsresults[i].date < examsresults[i + 1].date
      ) {
        // console.log("examsresults[i+1].date", examsresults[i + 1].date);
        removeItems.push(examsresults[i]);
        console.log("removeItems is:", removeItems);
      }
    }

    for (let j = 0; j < removeItems.length; j++) {
      if (remainItems.indexOf(removeItems[j]) !== -1) {
        remainItems.splice(remainItems.indexOf(removeItems[j]), 1);
      }
    }
    console.log("remainItems is:", remainItems);

    console.log("Line 29-new examsresults is:", examsresults);
    //----------------------------------------------------------

    let resultContent;

    if (examsresults === null || loading) {
      resultContent = <Spinner />;
    } else {
      resultContent = <ResultFeed examsresults={examsresults} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{resultContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

ResultsView.propTypes = {
  getExamsResults: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  result: state.result
});

export default connect(
  mapStateToProps,
  { getExamsResults }
)(ResultsView);
