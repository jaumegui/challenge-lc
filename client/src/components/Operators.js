import React, { Component } from "react";
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
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
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
      loading: false,
      operators: []
    }
  }

  componentDidMount() {
    this.fetchOperators()
  }

  givedetails(id) {
    this.setState({
      loading: true,
    })
    fetch(`http://localhost:3000/api/operators/${id}`)
      .then(response => response.json())
      .then(json => this.setState({
        details: json,
        loading: false
      }))
      .catch(error => console.log(error))  
    }

  fetchOperators() {
    fetch('http://localhost:3000/api/operators')
      .then(response => response.json())
      .then(json => this.setState({ operators: json }))
      .catch(error => console.log(error))
    this.setState({ loading: false });
  }

  render() {
    const { classes } = this.props;
    const { loading, operators } = this.state;

    if (loading) {
      return (
        <div className={classes.progress}>
          <CircularProgress size={32} />
        </div>
      );
    }

    console.log(this.state)
    return (
      <div className={classes.root}>
        <List>
          {operators.map(operator => (
            <ListItem key={operator.id} onClick={() => this.givedetails(operator.id)} button>
              <ListItemAvatar>
                <Avatar className={classes.purpleAvatar}>{operator.first_name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText inset primary={operator.first_name + " " + operator.last_name} />
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
