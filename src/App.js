import React, { Component } from 'react'

import Listt from './List'

import Item from './Item'
class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listItem: [],
      checked: []
    }
    this.addToList = this.addToList.bind(this)
    this.delete = this.delete.bind(this)
    this.deleteSelected = this.deleteSelected.bind(this)
    this.changeChecked = this.changeChecked.bind(this)
  }

  addToList(value){
    this.setState({
      listItem: [value, ...this.state.listItem],
      checked: [false, ...this.state.checked]
    }, ()=>console.log(this.state.checked))

  }
  changeChecked(index){
    let ar = this.state.checked
    ar[index] = !ar[index]
    this.setState({checked: ar}, ()=>{console.log(this.state.checked)})
  }

  
  delete(index){
    let arr = this.state.listItem
    let arrCheck = this.state.checked
    arr.splice(index, 1)
    arrCheck.splice(index, 1)
    this.setState({
      listItem: arr,
      checked: arrCheck
    })
  }
  deleteSelected(arrIndex){
    let promise = new Promise((res, rej)=>{
      let array = this.state.listItem
      let arrayChecked = this.state.checked
      let indexs = Array.from(arrIndex).sort((a, b)=> {return (b-a)})
      indexs.forEach(element => {
          array.splice(element, 1)
          arrayChecked.splice(element, 1)
      });
      return res({array: array, arrChecked: arrayChecked})
    })
    
    promise.then(object=>{
      this.setState({
        listItem: object.array,
        checked: object.arrChecked
      })
    })
    
  }
  render() {

    return (
      <div className="container">
        <h2 style={{textAlign:'center'}}>Todo App</h2>

        
        <Listt 
          list={this.state.listItem}
          checked={this.state.checked}
          addToList = {this.addToList}
          delete = {this.delete}
          deleteSelected = {this.deleteSelected}
          changeChecked = {this.changeChecked}
        />
        
      </div>
    )
  }
}

export default TodoApp