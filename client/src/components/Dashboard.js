import React, { Component } from 'react';
import { compose } from "redux";
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Select2 from './Select.js';
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Search from '@material-ui/icons/Search'
import Send from '@material-ui/icons/Send'
import Work from '@material-ui/icons/Work'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography, CircularProgress } from "@material-ui/core";
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
    justifyContent: "end"
  },
  link: {
    textDecoration: 'none'
  },
  buttons: {
    height: 10,
    width: 10
  }
}


class Dashboard extends Component {
  constructor(props) {
    super(props);


    this.state = {
      loading: true,
      details: [],
    }
    this.givedetails = this.givedetails.bind(this)
  }

  componentDidMount() {
    this.givedetails()
  }

  specialForJack() {
    if(this.props.match.params.id === 3) {
      return (
        <Typography variant="h5" gutterBottom>T'es mauvais Jack!</Typography>
      )
    }
  }
  
  givedetails() {
    const doIt = () => {
      fetch(`http://localhost:4000/api/operators/${this.props.match.params.id}`)
        .then(response => (response.json()))
        .then(json => this.setState({
          details: json,
          loading: false
        }))
        .catch(error => console.log(error))  
    }
    this.setState({ loading: true }, doIt())
  }

  deleteItem(id){
    let opURL = this.props.location.pathname
    let op = opURL.substr(opURL.length - 1)
    fetch(`http://localhost:4000/api/operators/poste/${id}`, {
      method: 'delete'
    })
    this.givedetails(op)
  }

  trigerStatus(idop, item_id, poste) {
    let oldItems = this.state.details
    let item = oldItems.find(item => item.id === idop )
    item[`${poste}`] = !item[`${poste}`]
    let index = oldItems.indexOf(item)
    oldItems.splice(index,1)
    oldItems.splice(index, 0, item)
    fetch(`http://localhost:4000/api/items/${poste}/${item_id}`)
    this.setState({
      details: oldItems
    })
  }

  addIcon(poste) {
    if(poste === "checkup") {
      return ( <Search style={{ fontSize: 40 }}/> )
    } if(poste === "pickup") {
      return ( <Work style={{ fontSize: 40 }}/> )
    } if(poste === "packup") {
      return ( <Send style={{ fontSize: 40 }}/> )
    }
  }

  getScore() {
    let score = 0
    this.state.details.forEach((item) => {
      if (item[`${item.poste}`]) {
        score += 1
      }
    })
    return score
  }

  render() {
    const { classes } = this.props;
    const { details, loading } = this.state;
    let score = this.getScore()

    if (loading) {
      return (
        <div className={classes.progress}>
          <CircularProgress size={128} />
        </div>
      );
    }
      
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
          <Avatar className={classes.purpleAvatar} size={"300"}>{score}</Avatar>
        </div>
        <Typography variant="h5" gutterBottom>{score} Objet{ score <= 1 ? "" : "s" } traité{ score <= 1 ? "" : "s" } pour un score de {score} point{ score <= 1 ? "" : "s" }</Typography>
        { this.specialForJack() }
        <Grid container spacing={16} style={styles.grid}>
          { details.map((object) => {
            return (
              <Grid item key={object.id}>
                <Card className={classes.card}>
                  <CardContent style={styles.title}>
                    <div>
                      <Typography variant="h5" component="h2">
                        {object.name}
                      </Typography>
                      <Typography  style={{ position: 'relative', top: 16, left: 86 }} color="textSecondary">
                          { this.addIcon(object.poste) }
                      </Typography>
                    </div>
                    <div style={{ position: "relative", top: 30}}>
                      <Switch
                        checked={object[object.poste]}
                        onChange={() => { this.trigerStatus(object.id, object.product_id, object.poste)}}
                        value="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                      <Fab 
                        color="secondary" 
                        aria-label="Delete" 
                        className={classes.fab} 
                        size='small'
                        onClick={() => { this.deleteItem(object.id) }}
                      >
                        <DeleteIcon />
                      </Fab>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
        <Select2 key="1"
          postes={[{id: 1, name: "pickup"},{ id: 2, name: "checkup"},{ id: 3, name: "packup" }]} 
          operator={this.props.match.params.id}
          action={this.givedetails}
        />
      </div>
    ) 
  }
}

export default compose(
  withStyles(styles)
)(Dashboard);
