import React ,{Component} from 'react'

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

class Item extends Component{
    
    constructor(props){
        super(props)
        
        this.DeleteOne = this.DeleteOne.bind(this)
        this.addToSelected = this.addToSelected.bind(this)        
        
    }

    DeleteOne(){
        this.props.delete(this.props.index)
    }
    addToSelected(e){
        this.props.selectItem(this.props.index)        
    }
    render(){
        console.log(this.props.checked)
        return (
            <ListItem  key={this.props.index} button >
                <Checkbox id={this.props.index} 
                    onChange={this.addToSelected}
                    checked={this.props.checked}
                />
                <ListItemText id={`item-${this.props.index}`} primary={this.props.value} />

                <IconButton aria-label="delete">
                    <DeleteIcon onClick={this.DeleteOne} />
                </IconButton>
            </ListItem>
        )
    }
}
export default Item

