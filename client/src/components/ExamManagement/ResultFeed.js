import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteExam } from "../../actions/examActions";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Button from "../common/Button";
// import TextFieldGroup from "./TextFieldGroup";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";

let counter = 0;
function createData(examId, examRunId, studentId, examsresult) {
  counter += 1;
  return {
    id: counter,
    examId,
    examRunId,
    studentId,
    examsresult
  };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "examId",
    numeric: false,
    disablePadding: true,
    label: "Exam ID"
  },
  {
    id: "studentId",
    numeric: false,
    disablePadding: false,
    label: "Student ID"
  },
  {
    id: "examRunId",
    numeric: false,
    disablePadding: false,
    label: "Exam Run ID"
  }
];

class ResultFeedHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

ResultFeedHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let ResultFeedToolbar = props => {
  const { numSelected, classes, selectedExamRunId, authName } = props;

  console.log("In 186 selectedExamRunId are:", selectedExamRunId);

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              disabled={authName !== "admin" ? true : false}
            >
              <DeleteIcon onClick={props.deleteIconClick} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

ResultFeedToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  // action: PropTypes.func.isRequired,
  selectedExamRunId: PropTypes.array.isRequired,
  authName: PropTypes.string.isRequired
};

ResultFeedToolbar = withStyles(toolbarStyles)(ResultFeedToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class ResultFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "name",
      selected: [],
      selectedExamRunId: [],
      sExamResuslt: [],
      // data:this.props.quizzes,
      data: [],
      page: 0,
      rowsPerPage: 5,
      // quizName: "",
      //   quizOwner: "",
      errors: {}
    };

    // this.handleFormSubmit = this.handleFormSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  componentWillMount = () => {
    //-----data for ExamFeed--------------
    this.props.examsresults.forEach(examsresult => {
      this.state.data = [
        ...this.state.data,
        createData(
          examsresult._id,
          examsresult.examId,
          examsresult.examRunId,
          examsresult.studentId,
          examsresult
        )
      ];
    });
    console.log("Line 280 data are:", this.state.data);
  };

  componentDidUpdate = prevProps => {
    // Typical usage (don't forget to compare props):
    if (this.props.examsresults !== prevProps.examsresults) {
      this.setState((this.state.data = []));
      this.props.examsresults.forEach(examsresult => {
        this.state.data = [
          ...this.state.data,
          createData(
            examsresult._id,
            examsresult.examId,
            examsresult.examRunId,
            examsresult.studentId,
            examsresult
          )
        ];
      });
      console.log("Line 299 data are:", this.state.data);
    }
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({
        selected: state.data.map(n => n.id),
        selectedExamRunId: state.data.map(n => n.examRunId),
        sExamsResult: state.data.map(n => n.examsresult)
      }));
      return;
    }
    this.setState({ selected: [], selectedExamRunId: [], sExamsResult: [] });
  };

  handleClick = (event, id, examRunId, examsresult) => {
    console.log("examsresult is:", examsresult);
    const { selected, selectedExamRunId, sExamsResult } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    let newSelectedExamRunId = [];
    let newsExamsResult = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newSelectedExamRunId = newSelectedExamRunId.concat(
        selectedExamRunId,
        examRunId
      );
      newsExamsResult = newsExamsResult.concat(sExamsResult, examsresult);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedExamRunId = newSelectedExamRunId.concat(
        selectedExamRunId.slice(1)
      );
      newsExamsResult = newsExamsResult.concat(sExamsResult.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedExamRunId = newSelectedExamRunId.concat(
        selectedExamRunId.slice(0, -1)
      );
      newsExamsResult = newsExamsResult.concat(sExamsResult.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedExamRunId = newSelectedExamRunId.concat(
        selectedExamRunId.slice(0, selectedIndex),
        selectedExamRunId.slice(selectedIndex + 1)
      );
      newsExamsResult = newsExamsResult.concat(
        sExamsResult.slice(0, selectedIndex),
        sExamsResult.slice(selectedIndex + 1)
      );
    }

    this.setState({
      selected: newSelected,
      selectedExamRunId: newSelectedExamRunId,
      sExamsResult: newsExamsResult
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  onDeleteClick = () => {
    // this.state.selectedExamRunId.forEach(id => this.props.deleteExam(id));
    // this.setState({
    //   // examName: "",
    //   selected: [],
    //   selectedExamRunId: [],
    //   sExamsResult: []
    //   // quizOwner: ""
    // });
    // // this.forceUpdate();
  };

  render() {
    const { classes, errors, examsresults, auth } = this.props;
    console.log("user name:", auth.user.name);
    console.log("exams are:", examsresults);

    const authName = auth.user.name;

    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        {console.log("selectedExamRunId is:", this.state.selectedExamRunId)}
        <ResultFeedToolbar
          numSelected={selected.length}
          selectedExamRunId={this.state.selectedExamRunId}
          authName={authName}
          deleteIconClick={this.onDeleteClick.bind(this)}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <ResultFeedHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event =>
                        this.handleClick(
                          event,
                          n.id,
                          n.examRunId,
                          n.examsresult
                        )
                      }
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      {/* <Link to={`/quizzes/${n.quizId}`}> */}
                      <TableCell component="th" scope="row" padding="none">
                        {n.examId}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.examRunId}
                      </TableCell>
                      <TableCell>{n.studentId}</TableCell>

                      <TableCell>
                        <Link
                          to={{
                            pathname: `/resultitem`,
                            examRunId: `${n.examRunId}`,
                            examId: `${n.examId}`
                          }}
                          className={
                            "btn btn-outline-primary "
                            // new Date().getTime() < Date.parse(n.startTime) ||
                            // new Date().getTime() < Date.parse(n.finishTime)
                            //   ? "btn btn-outline-primary " //disabled-link"
                            //   : "btn btn-outline-primary"
                          }
                        >
                          Show Result
                        </Link>
                      </TableCell>
                      {/* <TableCell>{n.examOwner}</TableCell>
                      <TableCell>
                        <Moment format="DD MMM YYYY (HH:mm)">
                          {n.startTime}
                        </Moment>
                      </TableCell>
                      <TableCell>
                        <Moment format="DD MMM YYYY (HH:mm)">
                          {n.finishTime}
                        </Moment>
                      </TableCell> */}
                      {/* </Link> */}
                      {/* <TableCell>
                        <Link
                          to={`/exams/${n.examRunId}`}
                          className={
                            new Date().getTime() < Date.parse(n.startTime) ||
                            new Date().getTime() > Date.parse(n.finishTime)
                              ? "btn btn-outline-secondary" //  disabled-link"
                              : "btn btn-outline-secondary"
                          }
                        >
                          View Result
                        </Link>
                      </TableCell> */}
                      {/* <TableCell>
                        <Link
                          to={{
                            pathname: `/examrun`,
                            examId: `${n.examId}`
                          }}
                          className={
                            new Date().getTime() < Date.parse(n.startTime) ||
                            new Date().getTime() > Date.parse(n.finishTime)
                              ? "btn btn-outline-primary" //  disabled-link"
                              : "btn btn-outline-primary"
                          }
                        >
                          Start Exam
                        </Link>
                      </TableCell> */}
                      {/* <TableCell>
                        <Link
                          to={{
                            pathname: `/resultview`,
                            examId: `${n.examId}`
                          }}
                          className={
                            // new Date().getTime() < Date.parse(n.startTime) ||
                            new Date().getTime() < Date.parse(n.finishTime)
                              ? "btn btn-outline-primary " //disabled-link"
                              : "btn btn-outline-primary"
                          }
                        >
                          Show Result
                        </Link>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

ResultFeed.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteExam: PropTypes.func.isRequired,
  examsresults: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteExam }
)(withStyles(styles)(ResultFeed));
