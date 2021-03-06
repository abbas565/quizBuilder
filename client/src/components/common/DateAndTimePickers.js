import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  }
});

function DateAndTimePickers(props) {
  const { classes } = props;

  return (
    // <form className={classes.container} noValidate>
    <TextField
      id="datetime-local"
      // label="Next appointment"
      label={props.label}
      type="datetime-local"
      defaultValue="2017-05-24T10:30"
      value={props.value}
      onChange={props.onChange}
      className={classes.textField}
      InputLabelProps={{
        shrink: true
      }}
    />
    // </form>
  );
}

DateAndTimePickers.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(DateAndTimePickers);
