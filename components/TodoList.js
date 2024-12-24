
import React, {useState} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import {getID}  from "./shorthands"
import { showPoppers, hidePoppers } from './popper';

library.add(fas)



function TodoList(){

   const [todos, setTodos] = useState([]);
   const [inputValue, setInputValue] = useState(''); 

   
   function handleChange(e){
    setInputValue(e.target.value)
   }


   function handleUpdate(e){
       const itemID = (e.target.id).split("-")[1] // get index of todo for easy retirval from array
       const todo = todos[itemID] // easily get todo from array
       const editForm = getID("edit-todo-form");
       const editInput = getID("input-edit")
       const inputID = getID("input-id")
       const itemNo = getID("item-no")
       itemNo.innerHTML = "<strong> Item No: "+itemID+"</strong>";
       //Toggle edit form css
       showPoppers();
       //changes values of nput fields for edit form
       editInput.value = todo
       inputID.value = itemID //pass index of todo for future retrival
    }


    function executeUpdate(e){
       e.preventDefault()
       const editElement = getID("input-edit")
       const inputID = getID("input-id") //helps us keep or track index of todo item in array
       const new_todos = [...todos]
       new_todos[inputID.value] = editElement.value // update todo at that index array point
       setTodos([...new_todos])
       hidePoppers();
    }


   function handleSubmit(e){
     e.preventDefault()

     if(inputValue.trim().length<2){
         alert("Input too short, please add more text to it")
         return
     }
      setTodos([...todos, inputValue])
      const input = getID("add-todo-input")
      setInputValue("")
      input.focus()
   }

   
   function handleDelete(e){
     if (window.confirm("Are you sure you want to delete this task?") == true){
        const itemID = e.target.id.split("-")[1]
        const new_todos =[...todos]
        new_todos.splice(itemID, 1)
        setTodos([...new_todos])
     }else{
        return;
     }
   }


   let i = 0 //use i to generate indexes for todo items in todos array
   return (   
        <div className="todo-div">
            <h1>Todo List App</h1>
            <form onSubmit={handleSubmit} id="add-item-form">
                <input type="text" id="add-todo-input" value={inputValue} onChange={handleChange} /> 
                <button><Fa icon="plus"/> Add Todo</button>
            </form>

            <form onSubmit={executeUpdate} id="edit-todo-form" className="popper">
              <button class="popper-dismiss-btn">X</button>
                <h5>Update To Do Item</h5>
                <p id="item-no"></p>
                <input type="text" id="input-edit" /> 
                <input type="hidden" id="input-id" />
                { /* Helps us keep the todo index in the array by keeping it in a hidden field */ }
                <button><Fa icon="save"/> Save</button>
            </form>

            <h3>Item List</h3>

            <ul id="todo-list-ul">
                {            
                  todos.map(
                    (todo)=>{
                        i+=1
                          return (
                            <li key={i-1} id={'list-item-'+(i-1)}>
                              <button className="edit-btn" id={"update-"+(i-1)} onClick={handleUpdate}> <Fa icon="pencil" /> Update</button>                            
                              <p><span>{i-1}</span> | {todo} </p>
                              <button className="del-btn"  id={"del-"+(i-1)} onClick={handleDelete}> <Fa icon="trash" /></button>
                            </li>
                        );
                    }       
                  )
                }
            </ul>
        </div>
    );
}


export default TodoList