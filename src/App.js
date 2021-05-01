import React, { useState, useEffect } from "react";
import "../src/styles/ui.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";
import { Button, FormControl, Input, InputLabel,Avatar  } from "@material-ui/core";
import UserSettings from './User-Settings';
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase/app";
import "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //When the app loads. we need to litsen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this code here.. fires when the app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snaphot) => {
        console.log(snaphot.docs.map((doc) => doc.data()));
        setTodos(snaphot.docs.map((doc) =>({id:doc.id,todo:doc.data().todo})));
      });
  }, []); 

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="App">
      <div className='Todo-Logo'>
     <img className="Todo-Logo-img" alt="Todo-logo" src='https://lh3.googleusercontent.com/proxy/zuvOovE4kyUwnUPsJ90uvFd04KB6E3LCA58BKTGcCubQqMWNknNsdN440HbOB7SqCUdC4j-i_hKQNM2hQx4W2iHATh9FGaEBjw'/>
        </div>
      <div className='User-Profile'>
      <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/59208992?v=4" className='user-profile-img'/>
       <div style={{marginTop:"-30px"}}>
      <UserSettings/>
      </div>
        </div>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">✅Write Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <div className='Add-Btn'>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
        >
          Add Todo
        </Button>
        </div>
      </form>
      <ul style={{marginTop:'50px',padding:'18px'}}>
        {todos.map((todo) => {
          console.log(todo);
          return <Todo todo={todo} />;
        })}
      </ul>
    </div>
  );
}

export default App;
