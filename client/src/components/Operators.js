import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { fetchOperators } from "../actions/operatorsActions";

const styles = theme => ({
  progress: {
    margin: "auto",
    marginTop: theme.spacing.unit * 4,
    width: "fit-content"
  },
  root: {
    margin: theme.spacing.unit * 3
  },
  todo: {
    marginTop: theme.spacing.unit * 4
  }
});

class Operators extends Component {
  static propTypes = {
    fetchOperators: PropTypes.func,
    operators: PropTypes.object
  };

  _isMounted = false;

  state = {
    loading: false
  };

  componentWillMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this.fetchOperators();
  }

  fetchOperators() {
    if (this.state.loading) return null;
    this.setState({ loading: true });
    this.props.fetchOperators().then(() => {
      this._isMounted && this.setState({ loading: false });
    });
  }

  render() {
    const { classes, operators } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <div className={classes.progress}>
          <CircularProgress size={32} />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <List>
          {_.map(operators, operator => (
            <ListItem key={operator.id}>
              <ListItemAvatar>
                <Avatar alt={`Avatar ID ${operator.id}`} />
              </ListItemAvatar>
              <ListItemText inset primary={operator.name} />
            </ListItem>
          ))}
        </List>
        <Typography className={classes.todo}>
          <em>
            TODO :<br />
            Lien vers dashboard personnel avec suivi des points et du nombre de
            pièces traitées suivant le jour
          </em>
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = ({ operatorsReducer: operators }) => ({ operators });

export default compose(
  connect(
    mapStateToProps,
    { fetchOperators }
  ),
  withStyles(styles)
)(Operators);
