import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { buildQuiz } from "../../actions/quizActions";
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
import TextFieldGroup from "./TextFieldGroup";

let counter = 0;
function createData(
  questionId,
  mainText,
  name,
  courseLevel,
  courseId,
  questionImage,
  que
) {
  counter += 1;
  return {
    id: counter,
    questionId,
    mainText,
    name,
    courseLevel,
    courseId,
    questionImage,
    que
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
    id: "mainText",
    numeric: false,
    disablePadding: true,
    label: "Question Text"
  },
  { id: "name", numeric: false, disablePadding: false, label: "Instructor" },
  {
    id: "courseLevel",
    numeric: false,
    disablePadding: false,
    label: "Course Level"
  },
  { id: "courseId", numeric: false, disablePadding: false, label: "Course ID" },
  {
    id: "questionImage",
    numeric: false,
    disablePadding: false,
    label: "Question Image"
  }
];

class EnhancedTableHead extends React.Component {
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

EnhancedTableHead.propTypes = {
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

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

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
            <IconButton aria-label="Delete">
              <DeleteIcon />
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

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "name",
      selected: [],
      selectedQueId: [],
      sQuestions: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
      quizName: "",
      quizOwner: "",
      errors: {}
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  // state = {
  //   order: "asc",
  //   orderBy: "name",
  //   selected: [],
  //   selectedQueId: [],
  //   sQuestions: [],
  //   data: [],
  //   page: 0,
  //   rowsPerPage: 5,
  //   quizName: "",
  //   quizOwner: "",
  //   errors: {}
  // };

  componentWillMount = () => {
    //-----data for EnhancedTable--------------
    this.props.questions.forEach(que => {
      this.state.data = [
        ...this.state.data,
        createData(
          que._id,
          que.mainText.trim().slice(0, 80) + " . . . .",
          que.name,
          que.courseLevel,
          que.courseId,
          que.questionImage,
          que
        )
      ];
    });
    console.log("data are:", this.state.data);
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
        selectedQueId: state.data.map(n => n.questionId)
      }));
      return;
    }
    this.setState({ selected: [], selectedQueId: [] });
  };

  handleClick = (event, id, questionId, que) => {
    console.log("que is:", que);
    const { selected, selectedQueId, sQuestions } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    let newSelectedQueId = [];
    let newSQuestions = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newSelectedQueId = newSelectedQueId.concat(selectedQueId, questionId);
      newSQuestions = newSQuestions.concat(sQuestions, que);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedQueId = newSelectedQueId.concat(selectedQueId.slice(1));
      newSQuestions = newSQuestions.concat(sQuestions.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedQueId = newSelectedQueId.concat(selectedQueId.slice(0, -1));
      newSQuestions = newSQuestions.concat(sQuestions.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedQueId = newSelectedQueId.concat(
        selectedQueId.slice(0, selectedIndex),
        selectedQueId.slice(selectedIndex + 1)
      );
      newSQuestions = newSQuestions.concat(
        sQuestions.slice(0, selectedIndex),
        sQuestions.slice(selectedIndex + 1)
      );
    }

    this.setState({
      selected: newSelected,
      selectedQueId: newSelectedQueId,
      sQuestions: newSQuestions
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    const { user } = this.props.auth;
    // console.log("EnhancedTable state:", this.EnhancedTable);

    // for (const checkbox of this.selectedCheckboxes) {
    //   // console.log(checkbox, "is selected.");
    //   // console.log("type of:", typeof checkbox);
    //   this.setState(
    //     (this.state.selectedQue = [...this.state.selectedQue, checkbox])
    //   );
    // this.props.questions.forEach(que => {
    //   if (que.mainText.trim().slice(0, 80) + " . . . ." == checkbox) {
    //     this.state.selectedQueId = [...this.state.selectedQueId, que._id];
    //     this.state.sQuestions = [...this.state.sQuestions, que];
    //   }
    // });
    // console.log("data are:", this.state.data);
    // }

    // for(){

    // }

    const newQuiz = {
      quizName: this.state.quizName,
      selectedQueId: this.state.selectedQueId,
      sQuestions: this.state.sQuestions,
      quizOwner: user.name,
      avatar: user.avatar
    };

    console.log("selected is:", this.state.selected);
    console.log("selectedQueId is:", this.state.selectedQueId);
    console.log("sQuestions are:", this.state.sQuestions);
    console.log("newQuiz in QuizBulder:", newQuiz);
    this.props.buildQuiz(newQuiz);

    this.setState({
      quizName: "",
      itemLables: [],
      selectedQue: [],
      selectedQueId: [],
      sQuestions: [],
      quizOwner: ""
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes, errors } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
          <Paper className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
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
                            this.handleClick(event, n.id, n.questionId, n.que)
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
                          <TableCell component="th" scope="row" padding="none">
                            {n.mainText}
                          </TableCell>
                          {/* <TableCell numeric>{n.name}</TableCell> */}
                          <TableCell>{n.name}</TableCell>
                          <TableCell>{n.courseLevel}</TableCell>
                          <TableCell>{n.courseId}</TableCell>
                          <TableCell>{n.questionImage}</TableCell>
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
              {/* handleFinalStateF={this.props.handleFinalState}; */}
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
          <button className="btn btn-default" type="submit">
            Submit Quiz
          </button>
        </form>
        {/* // {console.log("EnhancedTable state:", this.props.childern)}; */}
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  buildQuiz: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// export default withStyles(styles)(EnhancedTable);
export default connect(
  mapStateToProps,
  { buildQuiz }
)(withStyles(styles)(EnhancedTable));
