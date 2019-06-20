import React, { Component } from 'react';
import { compose } from "redux";
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { deepPurple } from '@material-ui/core/colors';


const styles = {
  progress: {
    margin: "auto",
    marginTop: 50,
    width: "fit-content"
  },
  root: {
    margin: 50,
  },
  purpleAvatar: {
    margin: 10,
    width: 100,
    height: 100,
    fontSize: 80,
    backgroundColor: deepPurple[500],
  },
  title: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: "space-between"
  },
  grid: {
    justifyContent: "space-between"
  },
  link: {
    textDecoration: 'none'
  },
}


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      details: [],
    }
  }
  
  componentDidMount() {
    this.givedetails()
  }
  
  givedetails(id) {
    this.setState({
      loading: true
    })
    fetch(`http://localhost:4000/api/operators/${this.props.match.params.id}`)
      .then(response => (response.json()))
      .then(json => this.setState({
        details: json,
        loading: false
      }))
      .catch(error => console.log(error))  
  }

  details() {
    const { classes } = this.props;
    const { details } = this.state;

    if(details.length !== 0) {
      return( 
        <div className={classes.root}>
          <div style={styles.title}>
            <div style={styles.title}>
              <Link to={'/operators'} style={styles.link}>
                <Button 
                  variant="outlined" 
                  color="default" 
                  className={classes.button} 
                  style={{marginRight: "20px"}}>
                    Retour
                </Button>
              </Link>
              <Typography variant="h3" gutterBottom>{details.name}</Typography>
            </div>
            <Avatar className={classes.purpleAvatar} size={"300"}>{details.score}</Avatar>
          </div>
          <h3>
            {details.items.length} Objet{ details.items.length === 0 ? "" : "s" } traité{ details.items.length === 0 ? "" : "s" } pour un score de {details.score} point{ details.items.length === 0 ? "" : "s" }</h3>
          <Grid container spacing={16} style={styles.grid}>
            { details.items.map((object) => {
              return (
                <Grid item xs={3} key={object.id}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {object.name}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {object.poste}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}

          </Grid>
        </div>
      )
    } return <h1 className={classes.root}>ne sert à rien</h1>
  }


  render() {
    return (
      <div>
        { this.details() }
      </div>
    );
  }
}

export default compose(
  withStyles(styles)
)(Dashboard);
