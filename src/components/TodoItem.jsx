'use strict';
import React from 'react';
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
    handleChange(event){
        if(this.props.editing){
            this.setState({editText:event.target.value});
        }
    }
    handleDestroy(){
        this.props.onDelete && this.props.onDelete()
    }
    handleEdit(){
        this.props.onEdit();
        this.setState({editText:this.props.todo.text})
    }
    handleKeyDown(event){
        if(event.which===ESCAPE_KEY){
            this.setState({editText:this.props.todo.text});
            this.props.onCancel(event);
        }else if(event.which === ENTER_KEY){
            this.handleSubmit(event);
        }
    }
    handleSubmit(event){
        let value=event.target.value.trim();
        if(value){

            this.props.onSaveEdit(value);
            this.setState({editText:value});
            this.props.onCancel();
        }
        else{
            this.props.onDelete();
            this.props.onCancel();
        }
    }

    render(){
        let localStyle={
            listStyleType:"none"
        };
        let element;
       
        if(this.props.editing){
            element=(
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText}
                    onBlur={this.handleSubmit.bind(this)}
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
                        checked={this.props.todo.completed}
                        onChange={this.props.onToggle}
                    />
                    <label onDoubleClick={this.handleEdit.bind(this)} >
                        {this.props.todo.text}
                    </label>
                    <button className="destroy" onClick={this.handleDestroy.bind(this)} />

                </div>
            );
        }
        return(
            <li className={classNames({
                completed:this.props.todo.completed,
                editing:this.props.editing
            })}
            >
                {element}
            </li>
        );
    }
}
export default TodoItem;