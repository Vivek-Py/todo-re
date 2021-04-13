import React from 'react'
import './App.css'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import fire from './Connect'
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

const db = fire.firestore()

const TaskList = (props) => {

    function deleteTask() {
        db.collection('todos').doc(props.name.id).delete()
    }

    function updateStatus() {
        if(props.name.status === 'Incomplete')
        {
            db.collection('todos').doc(props.name.id).update({
                status: 'Complete'
             });
        }
        else {
            db.collection('todos').doc(props.name.id).update({
                status: 'Incomplete'
            });
        }
    }

    function renderItem() {
        if(props.name.status === 'Incomplete') {
            return <DoneIcon />
        } else {
            return <ClearIcon />
        }
    }

    return (
        <div className="singular-task">
            <li className="task-name">{props.name.todo}</li>
            <button className="status-btn" onClick={updateStatus}>
                {
                    renderItem()
                }
            </button>
            <button className="delete-btn" onClick={deleteTask}>
                <DeleteOutlineIcon></DeleteOutlineIcon>
            </button>
        </div>
    )
}

export default TaskList
