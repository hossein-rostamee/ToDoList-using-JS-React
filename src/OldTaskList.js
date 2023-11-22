import React,{Component,Fragment} from 'react'
import makeId from './makeId'
import makeKey from './makeKey' 

class ToDoList extends Component{

    state = {
         tasks : [
            { id : makeId() , desc : "Wash gholam" , status : "todo"},
            { id : makeId() , desc : "Wash asghar" , status : "todo"},
            { id : makeId() , desc : "Wash changiz" , status : "todo"},
            { id : makeId() , desc : "Wash Amiri" , status : "doing"},
            { id : makeId() , desc : "Wash sajad" , status : "done"},
            { id : makeId() , desc : "Wash saeid" , status : "doing"},
        ],
        taskInp : ""
    }
    
    MakeUL = ( { status } ) => {  
        const tasks = this.state.tasks 
        let list = tasks.filter( task => task.status === status ).map( task => 
                        <Fragment key={makeKey()}>
                            <li>{task.desc}</li>
                            <button onClick={ () => this.handleClick(task.id , "todo") }>todo</button>
                            <button onClick={ () => this.handleClick(task.id , "doing") }>doing</button>
                            <button onClick={ () => this.handleClick(task.id , "done") }>done</button>
                        </Fragment>
                    )
            let lists = [ <Fragment key={status}>{status}</Fragment> , ...list ]
        return lists
    }

    handleClick = ( id , status ) => {
        const tasks = this.state.tasks
        tasks.forEach( task => { task.id === id ? task.status = status : task.status = task.status } )
        this.setState( {tasks} )
    } 

    handleChange = (event) => {
        this.setState( {taskInp:event.target.value} )
    }

    addTask = (newTask) => {
        this.setState( {taskInp:""} )
        this.setState(prevstate=>{
            return { 
                tasks : [ ...prevstate.tasks , { id:makeId(), desc:newTask, status:"todo"}],
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.state.taskInp ? this.addTask ( this.state.taskInp ) : alert( "Enter valid amount" )
    }

    render(){
        return <Fragment>
            <form>
                <input value = { this.state.taskInp }  onChange = { this.handleChange } id = {111} />
                <input type = "submit" onClick = { this.handleSubmit } />
            </form>
                <this.MakeUL status="todo"  />
                <br/><br/>
                <this.MakeUL status="doing" />
                <br/><br/>
                <this.MakeUL status="done"  />
        </Fragment>
    }
    
}
export default ToDoList

