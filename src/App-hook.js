import React, { useState, useEffect, useCallback } from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import { Checkbox, ListItemText } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';

function TodoApp() {
    let [listItem, setListItem] = useState([])
    let [listChecked, setListChecked] = useState(new Set())
    let [check, setCheck] = useState([])

    // add a new item to list
    const addNew = useCallback(()=>{
        let text = document.getElementById("input").value
        document.getElementById("input").value = ""
        setListItem([...listItem, text])
        setCheck([...check, false])
    },[listItem, check])

    const handleChange = (e)=>{
        let value = e.target.value
        document.getElementById("input").value = value        
    }

    //delete Selected item
    const deleteSelected = useCallback(()=>{
        let promise = new Promise((resolve, reject)=>{
            let list = listItem.slice()
            let listCheck = check.slice()
    
            let arrChecked = Array.from(listChecked).sort((a,b)=>{return (b-a)})
            arrChecked.forEach(e=>{
                list.splice(e, 1)
                listCheck.splice(e, 1)
            })
            return resolve({listItem: list, check: listCheck})
        })
        promise.then(ob=>{
            setListItem(ob.listItem)
            setListChecked(new Set())
            setCheck(ob.check)
        })        
    }, [listItem, listChecked, check])


    const Item = (props) => {
        const deleteOne = useCallback(() => {
            let b = listItem.splice(props.index, 1)
            let c = check.slice()
            c.splice(props.index, 1)
            b = listItem.slice()
            setListItem(b)
            setCheck(c)
        }, [listItem, check])

        const toggleSelected = useCallback(() => {
            let i = props.index
            
            let checkState = check.slice()
            let checkedIndex = new Set(Array.from(listChecked))
            if (checkedIndex.has(i)) {
                checkState[i] = !checkState[i]
                setListChecked(checkedIndex.delete(i))
                setCheck(checkState)
            }
            else {
                checkState[i] = !checkState[i]
                setListChecked(checkedIndex.add(i))
                setCheck(checkState)
            }
            console.log(listChecked)
        }, [listChecked, check])


        return (
            <ListItem key={props.index} button>
                <Checkbox
                    id={props.index}
                    onChange={toggleSelected}
                    checked={props.check}
                />

                <ListItemText primary={props.value} />
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={deleteOne} />
                </IconButton>
            </ListItem>
        )
    }


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
            <h2 style={{ textAlign: 'center' }}>Todo App</h2>
            <TextField
                id="input" label="Write Something" style={styleInput}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={styleButton}
                onClick={addNew}
            >
                Add
                </Button>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={deleteSelected}
            >
                Delete Selected
                </Button>


            <List>
                {listItem.map((value, index) => (
                    <Item
                        index={index}
                        value={value}
                        check={check[index]}
                    />
                ))}
            </List>
        </div>
    )

}

export default TodoApp