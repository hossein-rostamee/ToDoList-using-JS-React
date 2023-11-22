import React from 'react'
import { Component , Fragment } from 'react'
import makeId from './makeId';

const statutes = {
    todo  : "todo"  ,
    doing : "doing" ,
    done  : "done"
}

class TaskList extends Component {
    
    state = {
        tasks : [
            { id : makeId(), desc : "Wash gholam", status : statutes.todo } ,
            { id : makeId(), desc : "Wash eagle", status : statutes.doing } ,
            { id : makeId(), desc : "Wash karkas", status : statutes.done } ,
        ] ,
        taskInp : ''
    }

    renderUI = status => <Fragment key={ status }>
        <h1>{status[0]}</h1>
        <Tasklist status={status} tasks={this.state.tasks} changeState={this.handleClick} remove={this.remove} />
    </Fragment>

    handleChange = event => {
        this.setState(  { taskInp : event.target.value }  )
    }

    handleSubmit = event => {
        event.preventDefault()
        this.state.taskInp ? this.addTask( this.state.taskInp ) : alert( "Enter valid input" )
        this.setState( prevState => ( { taskInp : "" } ) )
    }

    handleClick = ( id , newStatus ) => {
        this.setState( prevState => ( { tasks : prevState.tasks.map( task => 
            task.id === id
            ? { ...task , status : newStatus } 
            : task
            ) } ) )
        }
    
    remove = ( id ) => {
        this.setState( prevState => ( { tasks : prevState.tasks.filter( task => task.id !== id ) } ) )
    }

    addTask = newTask => {
        this.setState( prevState => ( {
            tasks : [ ...prevState.tasks , { id : makeId() , desc : newTask , status : statutes.todo } ] } ) 
        )
    }

    render(){
        return <Fragment key='tasklist'>
            <form>
                <input value={this.state.taskInp} onChange={this.handleChange} />
                <input type='submit' onClick={this.handleSubmit} />
            </form>
            { Object.keys( statutes ).map( s => this.renderUI( s ) ) }
        </Fragment>
    }

}

export default TaskList

const Tasklist = ( { status, tasks, changeState , remove } ) => <>
    {
    tasks.filter( task => task.status === status ).map( task =>
        <>
            <li>{ task.desc }</li>
            { Object.keys( statutes ).map( s => <button onClick={ () => changeState( task.id , s ) } > { s } </button> ) }
            <button onClick={ () => remove( task.id ) }>remove</button>
        </>
    )
    }
</>  
