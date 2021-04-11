import React from 'react'
import './App.css'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import db from './Connect'

const TaskList = (props) => {

    function deleteTask() {
        db.collection('todos').doc(props.name.id).delete()
    }

    return (
        <div className="singular-task">
            <li>{props.name.todo}</li>
            <button className="delete-btn" onClick={deleteTask}>
                <DeleteOutlineIcon></DeleteOutlineIcon>
            </button>
        </div>
    )
}

export default TaskList
