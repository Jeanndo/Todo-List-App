import React, { useState } from "react";
import "./Todo.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from '@material-ui/icons/Edit';
import {
  List,
  ListItemText,
  ListItem,
  Button,
  Modal,
  makeStyles,
} from "@material-ui/core";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
  const updateTodo = () => {
    //update the todo with the new input text field
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <div className="Todo-container">
      <Modal open={open} onClose={(event) => setOpen(false)}>
        <div className={classes.paper}>
            <form>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button  disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
           onClick={updateTodo}>
               Update Todo 
               </Button>
               </form>
        </div>
      </Modal>
      <List className="todo_list">
        <ListItem>
          <ListItemText primary={props.todo.todo} />
          <EditIcon style={{ cursor: "pointer" }} onClick={(event) => setOpen(true)}/>
          <DeleteForeverIcon
          style={{ cursor: "pointer" }}
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        />
        </ListItem>
      </List>
    </div>
  );
}

export default Todo;
