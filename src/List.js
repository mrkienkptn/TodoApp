import React, { Component } from 'react'
import Item from './Item'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';

class Listt extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.addNew = this.addNew.bind(this)
        this.delete = this.delete.bind(this)
        this.deleteSelected = this.deleteSelected.bind(this)
        
    }
    componentWillMount = ()=>{
        this.selectedItem = new Set()
    }
    
    toggleCheckbox = index=>{
        if (this.selectedItem.has(index)){
            this.selectedItem.delete(index)
            this.props.changeChecked(index)
        }
        else{
            this.selectedItem.add(index)
            this.props.changeChecked(index)
        }             
    }

    addNew(e) {
        let value = document.getElementById("input").value
        if (value !== ""){
            this.props.addToList(value)
            let a = Array.from(this.selectedItem)
            a = a.map(x=>x+1)
            this.selectedItem = new Set(a)
            document.getElementById("input").value = ""
        }
    }
    handleChange(e) {
        let value = e.target.value
        document.getElementById("input").value = value
    }

    delete(index) {
        this.props.delete(index)
        this.selectedItem.delete(index)
        let array = Array.from(this.selectedItem).splice()
        array = array.map(x => {
            if (x>index) return (x-=1)
            else return x
        })
        this.selectedItem = new Set(array)
    }
    deleteSelected(){
        this.props.deleteSelected(this.selectedItem)
        this.selectedItem = new Set()
    }

    render() {
        const style = {
            width: '400px',
            margin: 'auto'
        }
        const styleButton = {
            marginTop: '17px',
            marginLeft: '20px'
        }
        const styleInput = {
            width: '310px',
            marginBottom: '20px'
        }
        
        return (
            <div style={style}>                
             
                <TextField
                    id="input" label="Write Something" style={styleInput}
                    onChange={this.handleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={styleButton}
                    onClick={this.addNew}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={this.deleteSelected}
                >
                    Delete Selected
                </Button>

                <List>
                    {this.props.list.map((value, index) => (
                        
                        <Item index={index} 
                            value={value} 
                            delete={this.delete} 
                            selectItem={this.toggleCheckbox}
                            checked = {this.props.checked[index]}
                        />
                    ))}
                </List>
            </div>


        )
    }
}
export default Listt
