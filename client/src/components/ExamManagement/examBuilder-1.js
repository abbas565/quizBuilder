import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { buildQuiz } from "../../actions/quizActions";
import { buildExam } from "../../actions/examActions";
import { getProfiles } from "../../actions/profileActions";
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
import TextFieldGroup from "../common/TextFieldGroup";
import isEmpty from "./../../validation/is-empty";
import { bindActionCreators } from "redux";

let counter = 0;
function createData(userId, firstname, lastname, avatar, pro) {
  counter += 1;
  return {
    id: counter,
    userId,
    firstname,
    lastname,
    avatar,
    pro
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
    id: "userId",
    numeric: false,
    disablePadding: true,
    label: "Student ID"
  },
  {
    id: "firstname",
    numeric: false,
    disablePadding: false,
    label: "First Name"
  },
  { id: "lastname", numeric: false, disablePadding: false, label: "Last Name" },
  {
    id: "avatar",
    numeric: false,
    disablePadding: false,
    label: "Student Photo"
  }
];

class ExamBuilderHead extends React.Component {
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

ExamBuilderHead.propTypes = {
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

let ExamBuilderToolbar = props => {
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
          // <Tooltip title="Submit Quiz">
          //   <IconButton aria-label="Delete">
          //     <DeleteIcon onClick={props.submitButtonClick} />
          //   </IconButton>
          // </Tooltip>
          <button
            className="btn btn-default"
            type="submit"
            onClick={props.submitButtonClick}
          >
            Submit Exam
          </button>
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

ExamBuilderToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

ExamBuilderToolbar = withStyles(toolbarStyles)(ExamBuilderToolbar);

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

class ExamBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "name",
      selected: [],
      selectedStuId: [],
      sStudents: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
      examName: "",
      examOwner: "",
      errors: {}
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount = () => {
    //-----data for ExamBuilder--------------
    // const myprofiles = this.props.getProfiles();
    this.props.getProfiles();

    const { profiles, loading } = this.props.profile;
    console.log("272-profiles in ExamBuilder component are:", profiles);
    console.log("273-type of profiles is:", typeof profiles);

    profiles.forEach(prof => {
      console.log("276-prof is:", prof);
    });

    // this.props.profiles.forEach(prof => {
    //   this.state.data = [
    //     ...this.state.data,
    //     createData(
    //       prof.user._id,
    //       prof.firstname,
    //       prof.lastname,
    //       prof.user.avatar,
    //       prof
    //     )
    //   ];
    // });

    // profiles.forEach(prof => {
    //   this.setState({
    //     data: [
    //       ...this.state.data,
    //       createData(
    //         prof.user._id,
    //         prof.firstname,
    //         prof.lastname,
    //         prof.user.avatar,
    //         prof
    //       )
    //     ]
    //   });
    // });

    console.log("data in componentWillMount are:", this.state.data);
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
        selectedStuId: state.data.map(n => n.questionId),
        sStudents: state.data.map(n => n.que)
      }));
      return;
    }
    this.setState({ selected: [], selectedStuId: [], sStudents: [] });
  };

  handleClick = (event, id, userId, pro) => {
    console.log("pro is-Line 302:", pro);
    const { selected, selectedStuId, sStudents } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    let newSelectedStuId = [];
    let newSStudents = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newSelectedStuId = newSelectedStuId.concat(selectedStuId, userId);
      newSStudents = newSStudents.concat(sStudents, pro);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedStuId = newSelectedStuId.concat(selectedStuId.slice(1));
      newSStudents = newSStudents.concat(sStudents.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedStuId = newSelectedStuId.concat(selectedStuId.slice(0, -1));
      newSStudents = newSStudents.concat(sStudents.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedStuId = newSelectedStuId.concat(
        selectedStuId.slice(0, selectedIndex),
        selectedStuId.slice(selectedIndex + 1)
      );
      newSStudents = newSStudents.concat(
        sStudents.slice(0, selectedIndex),
        sStudents.slice(selectedIndex + 1)
      );
    }

    this.setState({
      selected: newSelected,
      selectedStuId: newSelectedStuId,
      sStudents: newSStudents
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

    const newExam = {
      examName: this.state.examName,
      selectedStuId: this.state.selectedStuId,
      sStudents: this.state.sStudents,
      examOwner: user.name,
      avatar: user.avatar
    };

    console.log("selected is:", this.state.selected);
    console.log("selectedStuId is:", this.state.selectedStuId);
    console.log("sStudents are:", this.state.sStudents);
    console.log("newExam in ExamBuilder:", newExam);
    this.props.buildExam(newExam);

    this.setState({
      examName: "",
      selected: [],
      selectedStuId: [],
      sStudents: [],
      examOwner: ""
    });

    // this.forceUpdate();
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { profiles, loading } = this.props.profile;
    console.log("profiles in ExamBuilder component are:", profiles);

    // this.props.profile.profiles.forEach(pro => {
    //   this.state.data = [
    //     ...this.state.data,
    //     createData(
    //       pro.user._id,
    //       // pro.user.name,
    //       pro.firstname,
    //       pro.lastname,
    //       pro.user.avatar,
    //       pro
    //     )
    //   ];
    // });

    console.log("data in render are:", this.state.data);

    const { classes, errors } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <TextFieldGroup
            placeholder="* Enter Exam Name Please"
            name="examName"
            type="text"
            value={this.state.examName}
            onChange={this.onChange}
            error={errors.examName}
            info="The Exam Name"
          />
          <Paper className={classes.root}>
            <ExamBuilderToolbar
              numSelected={selected.length}
              submitButtonClick={this.handleFormSubmit.bind(this)}
            />
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <ExamBuilderHead
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
                            {n.userId}
                          </TableCell>
                          <TableCell>{n.firstname}</TableCell>
                          <TableCell>{n.lastname}</TableCell>
                          <TableCell>
                            {" "}
                            {!isEmpty(n.avatar) ? (
                              <img
                                className="questionImgSmall"
                                src={"../" + n.avatar}
                                alt="Student Photo"
                              />
                            ) : (
                              <p>No Photo</p>
                            )}
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
          {/* <button className="btn btn-default" type="submit">
            Submit Quiz
          </button> */}
        </form>
      </div>
    );
  }
}

ExamBuilder.propTypes = {
  classes: PropTypes.object.isRequired,
  buildExam: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
  // profiles: state.profiles
});

//-----First Way--------------
// const mapDispatchToProps = {
//   buildExam,
//   getProfiles
// };

//----Second Way--------------
// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       buildExam,
//       getProfiles
//     },
//     dispatch
//   );

//------Third Way-----------------
// const mapDispatchToProps = {
//   ...buildExam,
//   ...getProfiles
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withStyles(styles)(ExamBuilder));

export default connect(
  mapStateToProps,
  { buildExam, getProfiles }
)(withStyles(styles)(ExamBuilder));
