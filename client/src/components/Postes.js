import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart'
import {
  Fade,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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


let data = (posts) => {
  return (
    // Faker les stats de vente------------------------------------------------------
    [{name: 'Lundi', uv: Math.floor(Math.random() * 6) + 1, pv: 2400, amt: 2400}, 
                {name: 'Mardi', uv: Math.floor(Math.random() * 6) + 1, pv: 2300, amt: 2300},
                {name: 'Mercredi', uv: Math.floor(Math.random() * 6) + 1, pv: 2300, amt: 2300},
                {name: 'Jeudi', uv: Math.floor(Math.random() * 6) + 1, pv: 2300, amt: 2300},
                {name: 'Vendredi', uv: Math.floor(Math.random() * 6) + 1, pv: 2300, amt: 2300},
                {name: 'Samedi', uv: posts, pv: 2300, amt: 2300}
                ]
    // Faker les stats de vente------------------------------------------------------
  )
};

class Postes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      postes: [],
      postesDetails: [],
      status: []
    };

    this.fetchPostes()
  }

  fetchPostes() {
    fetch(`http://localhost:4000/api/postes`)
      .then(response => response.json())
      .then(json => this.setState({
        postes: json,
        loading: false
      }))
      .catch(error => console.log(error))
  }

  fetchPostesDetails(id) {
    this.setState({loading: true})
    fetch(`http://localhost:4000/api/postes/${id}`)
      .then(response => response.json())
      .then(json => this.setState({
        postesDetails: json,
        loading: false
      }))
      .catch(error => console.log(error))
  }

  renderTable() {
    if(this.state.postesDetails.length !== 0 ) {
      return(
        <Fade in>
          <div>
            <Paper>
                  <Table className={this.props.classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Operator</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.postesDetails.map(item => (
                        <TableRow key={item.id} >
                          <TableCell component="th" scope="row">
                            {item.item}
                          </TableCell>
                          <TableCell align="right">{item.operator}</TableCell>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right">{item.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
            </Paper>
            <div style={{display: "flex", justifyContent: 'center', marginTop: '30px'}}>
              <Chart 
                postesCount={this.state.postesDetails.length} 
                data={data(this.state.postesDetails.length)} 
              />
              </div>
          </div>
        </Fade>
      )
    }
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <div className={classes.progress}>
          <CircularProgress size={128} />
        </div>
      );
    }

    return (
      <div className={this.props.classes.root}>
        <List>
          {this.state.postes.map(poste => (
            <ListItem key={poste.id} button>
              <ListItemText
                className={this.props.classes.text}
                primary={poste.category}
                onClick={ () => { this.fetchPostesDetails(poste.id)}}
              />
            </ListItem>
          ))}
        </List>
        { this.renderTable() }
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
