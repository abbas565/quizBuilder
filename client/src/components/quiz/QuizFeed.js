import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteQuiz } from "../../actions/quizActions";
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
// import TextFieldGroup from "./TextFieldGroup";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";

let counter = 0;
function createData(quizId, quizName, quizOwner, quizDate, quiz) {
  counter += 1;
  return {
    id: counter,
    quizId,
    quizName,
    quizOwner,
    quizDate,
    quiz
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
    id: "quizName",
    numeric: false,
    disablePadding: true,
    label: "Quiz name"
  },
  {
    id: "quizOwner",
    numeric: false,
    disablePadding: false,
    label: "Instructor"
  },
  {
    id: "quizDate",
    numeric: false,
    disablePadding: false,
    label: "Quiz Build Date"
  }
];

class QuizFeedHead extends React.Component {
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

QuizFeedHead.propTypes = {
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

let QuizFeedToolbar = props => {
  const { numSelected, classes, selectedQuizId, authName } = props;

  console.log("In 179 selectedQuizId is:", selectedQuizId);

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

QuizFeedToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
  selectedQuizId: PropTypes.array.isRequired,
  authName: PropTypes.string.isRequired
};

QuizFeedToolbar = withStyles(toolbarStyles)(QuizFeedToolbar);

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

class QuizFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "name",
      selected: [],
      selectedQuizId: [],
      sQuizzes: [],
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
    //-----data for QuizFeed--------------
    this.props.quizzes.forEach(quiz => {
      this.state.data = [
        ...this.state.data,
        createData(quiz._id, quiz.quizName, quiz.quizOwner, quiz.date, quiz)
      ];
    });
    console.log("Line 273 data are:", this.state.data);
  };

  componentDidUpdate = prevProps => {
    // Typical usage (don't forget to compare props):
    if (this.props.quizzes !== prevProps.quizzes) {
      this.setState((this.state.data = []));
      this.props.quizzes.forEach(quiz => {
        this.state.data = [
          ...this.state.data,
          createData(quiz._id, quiz.quizName, quiz.quizOwner, quiz.date, quiz)
        ];
      });
      console.log("Line 293 data are:", this.state.data);
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
        selectedQuizId: state.data.map(n => n.quizId),
        sQuizzes: state.data.map(n => n.quiz)
      }));
      return;
    }
    this.setState({ selected: [], selectedQuizId: [], sQuizzes: [] });
  };

  handleClick = (event, id, quizId, quiz) => {
    console.log("quiz is:", quiz);
    const { selected, selectedQuizId, sQuizzes } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    let newSelectedQuizId = [];
    let newSQuizzes = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newSelectedQuizId = newSelectedQuizId.concat(selectedQuizId, quizId);
      newSQuizzes = newSQuizzes.concat(sQuizzes, quiz);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedQuizId = newSelectedQuizId.concat(selectedQuizId.slice(1));
      newSQuizzes = newSQuizzes.concat(sQuizzes.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedQuizId = newSelectedQuizId.concat(selectedQuizId.slice(0, -1));
      newSQuizzes = newSQuizzes.concat(sQuizzes.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedQuizId = newSelectedQuizId.concat(
        selectedQuizId.slice(0, selectedIndex),
        selectedQuizId.slice(selectedIndex + 1)
      );
      newSQuizzes = newSQuizzes.concat(
        sQuizzes.slice(0, selectedIndex),
        sQuizzes.slice(selectedIndex + 1)
      );
    }

    this.setState({
      selected: newSelected,
      selectedQuizId: newSelectedQuizId,
      sQuizzes: newSQuizzes
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
    this.state.selectedQuizId.forEach(id => this.props.deleteQuiz(id));
    this.setState({
      // quizName: "",
      selected: [],
      selectedQuizId: [],
      sQuizzes: []
      // quizOwner: ""
    });
    // this.forceUpdate();
  };

  render() {
    const { classes, errors, quizzes, auth } = this.props;
    console.log("user name:", auth.user.name);
    console.log("quizzes are:", quizzes);

    const authName = auth.user.name;

    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        {console.log("selectedQuizId is:", this.state.selectedQuizId)}
        <QuizFeedToolbar
          numSelected={selected.length}
          selectedQuizId={this.state.selectedQuizId}
          authName={authName}
          deleteIconClick={this.onDeleteClick.bind(this)}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <QuizFeedHead
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
                        this.handleClick(event, n.id, n.quizId, n.quiz)
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
                        {n.quizName}
                      </TableCell>
                      <TableCell>{n.quizOwner}</TableCell>
                      <TableCell>
                        <Moment format="YYYY/MM/DD">{n.quizDate}</Moment>
                      </TableCell>
                      {/* </Link> */}
                      <TableCell>
                        <Link
                          to={`/quizzes/${n.quizId}`}
                          className="btn btn-info"
                        >
                          View Quiz
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/exambuilder`} className="btn btn-primary">
                          Build Exam
                        </Link>
                      </TableCell>
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

QuizFeed.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  quizzes: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteQuiz }
)(withStyles(styles)(QuizFeed));
