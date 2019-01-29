// import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";
// import Icon from "@material-ui/core/Icon";
// import DeleteIcon from "@material-ui/icons/Delete";
// import NavigationIcon from "@material-ui/icons/Navigation";

// const styles = theme => ({
//   fab: {
//     margin: theme.spacing.unit
//   },
//   extendedIcon: {
//     marginRight: theme.spacing.unit
//   }
// });

// function HintButtons(props) {
//   const { classes } = props;
//   return (
//     <div>
//       <Fab color="primary" aria-label="Add" className={classes.fab}>
//         {/* <AddIcon /> */}
//         Hints/Tips
//       </Fab>
//       {/* <Fab color="secondary" aria-label="Edit" className={classes.fab}>
//         <Icon>edit_icon</Icon>
//       </Fab>
//       <Fab variant="extended" aria-label="Delete" className={classes.fab}>
//         <NavigationIcon className={classes.extendedIcon} />
//         Extended
//       </Fab>
//       <Fab disabled aria-label="Delete" className={classes.fab}>
//         <DeleteIcon />
//       </Fab> */}
//     </div>
//   );
// }

// HintButtons.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(HintButtons);

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import Badge from "@material-ui/core/Badge";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

function HintButton(props) {
  const { classes } = props;
  return (
    <div>
      <Badge className={classes.margin} badgeContent={4} color="primary">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Hints/Tips
        </Button>
      </Badge>
    </div>
  );
}

HintButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HintButton);
