'use strict';
import React from 'react';
const {connect, actions , dispatch} = require('tredux');
var classNames = require('classnames');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;
class TodoItem extends React.Component {
    constructor(props){
        super(props);
        this.state={
            editText:this.props.todo.text
        }
    }
    edit(todo,text){
        dispatch(actions.todos.editTodo(todo.id,text));
    }
    handleChange(event){
        const{editingTodo,todo}=this.props;
        if(editingTodo === todo.id){
            this.setState({editText:event.target.value});
        }
    }
    handleDestroy(){
        this.props.onDelete && this.props.onDelete()
    }
    handleEdit(){
        const{todo}=this.props;
        dispatch(actions.ui.setEditing(todo.id));
        this.setState({editText:this.props.todo.text})
    }
    handleKeyDown(event){
        if(event.which===ESCAPE_KEY){
            this.setState({editText:todo.text});
        }else if(event.which === ENTER_KEY){
            this.handleSubmit(event);
        }
        dispatch(actions.ui.unsetEditing());
    }
    handleSubmit(event){
        const{todo}=this.props;
        let value=event.target.value.trim();
        if(value){
            this.edit.bind(this,todo,value);
            this.setState({editText:value});
        }
        else{
            this.props.onDelete();
        }
    }
    set_editing(){
        const{todo}=this.props;
        dispatch(actions.ui.setEditing(todo.id));
    }
    unset_editing(){
        dispatch(actions.ui.unsetEditing());
    }
    render(){
        const {editingTodo,todo}=this.props;
        let element;

        if(editingTodo===todo.id){
            console.log(editingTodo+" "+todo.id);
            element=(
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText}
                    // onBlur={this.handleSubmit.bind(this)}
                    onChange={this.handleChange.bind(this)}
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
                        onChange={this.props.onToggle}
                    />
                    <label onDoubleClick={this.handleEdit.bind(this)} >
                        {todo.text}
                    </label>
                    <button className="destroy" onClick={this.handleDestroy.bind(this)} />

                </div>
            );
        }
        return(
            <li className={classNames({
                completed:this.props.todo.completed,
                editing:this.editingTodo
            })}
            >
                {element}
            </li>
        );
    }
}
function mapState(state, params) {
    return {
        editingTodo:state.ui.editingTodo
    }
}
export default connect(mapState, TodoItem);

