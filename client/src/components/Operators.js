import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
import { fetchOperators } from "../actions/operatorsActions";

const styles = theme => ({
  progress: {
    margin: "auto",
    marginTop: theme.spacing.unit * 4,
    width: "fit-content"
  },
  link: {
    textDecoration: 'none'
  },
  card: {
    width: 200
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    margin: theme.spacing.unit * 3
  },
  todo: {
    marginTop: theme.spacing.unit * 4
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 5,
    color: '#fff',
    backgroundColor: deepPurple[500],
  }
});

class Operators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      details: [],
      operators: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/operators')
      .then(response => response.json())
      .then(json => this.setState({ operators: json, loading: false }))
      .catch(error => console.log(error))
  }

  render() {
    const { classes } = this.props;
    const { loading, operators } = this.state;

    if (loading) {
      return (
        <div className={classes.progress}>
          <CircularProgress size={128} />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <List>
          {operators.map(operator => (
            <Link key={operator.id} to={`dashboard/${operator.id}`} className={classes.link}>
              <ListItem key={operator.id} button>
                <ListItemAvatar>
                  <Avatar className={classes.purpleAvatar}>{operator.first_name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText inset primary={operator.first_name + " " + operator.last_name} />
              </ListItem>
            </Link>
          ))}
        </List>
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
