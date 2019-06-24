import React, { Component } from 'react';
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default class Select2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      products: [],
      product: {},
      selectedProduct: "",
      selectedPoste: ""
    };
  }

  componentWillMount() {
    fetch(`http://localhost:4000/api/products`)
      .then(response => (response.json()))
      .then(json => this.setState({ products: json }))
  }

  setItemName(e) {
    let item = e.target.value
    let product_id = this.state.products.find(obj => obj.name == item).id
    this.setState(prevState => ({ product: { ...prevState.product, item_id: product_id}, selectedProduct: item }))
  }


  setItemPoste(e) {
    let poste_name = e.target.value
    let poste_id = this.props.postes.find(obj => obj.name === poste_name)
    this.setState({ selectedPoste: poste_name })
    this.setPosteState(poste_id)
  }

  setPosteState(poste_id) {
    this.setState(prevState => ({ product: { ...prevState.product, poste_id: poste_id['id'] }}))
  }

  fetchPosteApi() {
    this.handleClose()
    fetch(`http://localhost:4000/api/items/${this.props.operator}/${this.state.product.item_id}/${this.state.product.poste_id}`, {
      method: 'post',
    })
      .then(response => (response.json()))
      .then(json => console.log(json))
      .catch(error => console.log(error))
    this.props.action()
  }


  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false});
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        margin: '8px',
        minWidth: 100,
      },
      fab: {
        position: 'absolute',
        right: 10,
        bottom: 10
      },
      dialogContent: {
        flex: "1 1 auto",
        padding: "8px 24px 8px 24px",
        overflowY: "auto"
      }
    };
    return (
      <div>
        <div style={{ position: "absolute", bottom: '30px', right: '30px'}}>
          <Fab color="primary" aria-label="Add" className={styles.fab} onClick={ () => { this.handleClickOpen() }}>
            <AddIcon className={styles.fab}/>
          </Fab>
        </div>
        <Dialog 
          disableBackdropClick disableEscapeKeyDown 
          open={this.state.open} 
          onClose={ () => {this.handleClose() }}
          maxWidth={'xs'}
          fullWidth={'true'}
          style={{display: "flex", maxHeight: "calc(100% - 96px)", flexDirection: "column"}}
        >
          <DialogTitle>Create an Item</DialogTitle>
          <DialogContent className={styles.dialogContent}>
            <form style={ { display: 'flex', flexWrap: 'wrap'}}>
              <FormControl style={styles.formControl}>
                <InputLabel htmlFor="product">Product</InputLabel>
                <Select
                  value={this.state.selectedProduct}
                  onChange={(e) => {this.setItemName(e)}}
                  input={<Input id="product" />}
                >
                { this.state.products.map((product) => {
                    return(
                      <MenuItem value={product.name}>{product.name}</MenuItem>
                    )
                })}
                </Select>
              </FormControl>
              <FormControl style={styles.formControl}>
                <InputLabel htmlFor="poste-simple">Poste</InputLabel>
                <Select
                  value={this.state.selectedPoste}
                  onChange={(e) => {this.setItemPoste(e)}}
                  input={<Input id="poste-simple" />}
                >
                  <MenuItem value={"pickup"}>Pickup</MenuItem>
                  <MenuItem value={"checkup"}>Checkup</MenuItem>
                  <MenuItem value={"packup"}>Packup</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.handleClose()}} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {this.fetchPosteApi()}} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
