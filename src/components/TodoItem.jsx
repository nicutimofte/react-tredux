'use strict';
import React from 'react';
const {connect, actions , dispatch} = require('tredux');
var classNames = require('classnames');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;
class TodoItem extends React.Component {
    constructor(props){
        super(props);
    }
    edit(text){
        const{todo}=this.props;
        dispatch(actions.todos.editTodo(todo.id,text));
    }
    deleteTodo(){
        const{todo}=this.props;
        dispatch(actions.todos.deleteTodo(todo.id));
    }

    handleEdit(){
        const{todo}=this.props;
        dispatch(actions.ui.setEditing(todo.id));
    }
    handleKeyDown(event){
        if(event.which===ESCAPE_KEY || event.which===ENTER_KEY){
            dispatch(actions.ui.unsetEditing());
        }
        if(event.which === ENTER_KEY){
            this.handleSubmit(event);
        }
    }
    handleSubmit(event){
        let value=event.target.value.trim();
        if(value){
            this.edit(value);
        }
        else{
            this.deleteTodo();
        }
    }
    toggle(){
        const{todo}=this.props;
        dispatch(actions.todos.completeTodo(todo.id));
    }
    render(){
        const {editingTodo,todo,editText}=this.props;
        let element;
        if(editingTodo===todo.id){
            element=(
                <input
                    ref="editField"
                    className="edit"
                    defaultValue={todo.text}
                    onKeyDown={this.handleKeyDown.bind(this)}
                />
            );
        }else{
            element=(
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={this.toggle.bind(this)}
                    />
                    <label onDoubleClick={this.handleEdit.bind(this)} >
                        {todo.text}
                    </label>
                    <button className="destroy" onClick={this.deleteTodo.bind(this)} />

                </div>
            );
        }
        return(
            <li className={classNames({
                completed:this.props.todo.completed,
                editing:editingTodo
            })}
            >
                {element}
            </li>
        );
    }
}
function mapState(state, params) {
    return {
        editingTodo:state.ui.editingTodo,
        editText:state.ui.editText
    }
}
export default connect(mapState, TodoItem);

