import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { fetchPostes } from "../actions/postesActions";

const styles = theme => ({
  progress: {
    margin: "auto",
    marginTop: theme.spacing.unit * 4,
    width: "fit-content"
  },
  root: {
    margin: theme.spacing.unit * 3
  },
  text: {
    textTransform: "capitalize"
  },
  todo: {
    marginTop: theme.spacing.unit * 4
  }
});

class Postes extends Component {
  static propTypes = {
    fetchPostes: PropTypes.func,
    postes: PropTypes.object
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
    this.fetchPostes();
  }

  fetchPostes() {
    if (this.state.loading) return null;
    this.setState({ loading: true });
    this.props.fetchPostes().then(() => {
      this._isMounted && this.setState({ loading: false });
    });
  }

  render() {
    const { classes, postes } = this.props;
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
          {_.map(postes, poste => (
            <ListItem key={poste.id}>
              <ListItemText
                inset
                className={classes.text}
                primary={poste.category}
              />
            </ListItem>
          ))}
        </List>
        <Typography className={classes.todo}>
          <em>
            TODO pour aller plus loin :<br />
            Comparaison du nombre de pièces traitées quotidiennement sur les X
            derniers jours
          </em>
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = ({ postesReducer: postes }) => ({ postes });

export default compose(
  connect(
    mapStateToProps,
    { fetchPostes }
  ),
  withStyles(styles)
)(Postes);
