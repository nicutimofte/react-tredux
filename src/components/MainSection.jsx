'use strict';
import React, {Component,PropTypes} from 'react';
const {connect, actions, getState, dispatch} = require('tredux');

import TodoItem from './TodoItem.jsx';
import TodoFilter from './TodoFilter.jsx';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters.jsx'

var ENTER_KEY = 13;

class MainSection extends React.Component {
    constructor(props){
        super(props);
        this.state={
            editing: null
        };
    }
    addTodo(text){
        dispatch(actions.todos.addTodo(text));
    }
    deleteTodo(todo){
        dispatch(actions.todos.deleteTodo(todo.id));
    }
    edit(todo,text){
        dispatch(actions.todos.editTodo(todo.id,text));
    }
    handleClickAll(){
        dispatch(actions.todos.setVisibilityFilter(SHOW_ALL));
    }
    handleClickActive(){
        dispatch(actions.todos.setVisibilityFilter(SHOW_ACTIVE));
    }
    handleClickCompleted(){
        dispatch(actions.todos.setVisibilityFilter(SHOW_COMPLETED));
    }

    handleNewTodoKeyDown(event){
        if(event.keyCode !== ENTER_KEY)
            return;
        event.preventDefault();

        var val=event.target.value.trim();
        if(val){
            this.addTodo(val);
            event.target.value='';
        }
    }
    handleClearCompleted() {
        dispatch(actions.todos.clearCompleted());
    }
    handleShow(filter) {
        this.setState({filter: filter })
    }
    onCancelEditing(){
        this.setState({editing:null})
    }
    renderFooter(completedCount) {
        const { allTodos } = this.props;
        const { filter } = this.state;
        let count;
        const currentCount=this.setItemsLeft(completedCount);
        if (allTodos.length) {
            return (
                <TodoFilter
                    key={filter}
                    completedCount={completedCount}
                    count={currentCount}
                    filter={filter}
                    clearCompletedButton={this.handleClearCompleted.bind(this)}
                    nowShowing={this.state.filter}
                    clickedAll={this.handleClickAll.bind(this)}
                    clickedActive={this.handleClickActive.bind(this)}
                    clickedCompleted={this.handleClickCompleted.bind(this)}

                />
            )
        }
    }
    renderToggleAll(completedCount) {
        const { allTodos } = this.props;
        if (allTodos.length > 0) {
            return (
                <input className="toggle-all"
                       type="checkbox"
                       checked={completedCount === allTodos.length}
                       onChange={this.toggleAll.bind(this)} />
            )
        }
    }
    setItemsLeft(completedCount){
        const { allTodos } = this.props;
        const { filter } = this.state;
        const activeCount=allTodos.length-completedCount;
        let count;

        if(filter===SHOW_ALL){
            count=allTodos.length;
        }
        else
        if(filter===SHOW_ACTIVE){
            count=activeCount;
        }
        else{
            count=completedCount;
        }
        return count;
    }
    setEditing(todo){
        this.setState({editing:todo.id});
    }

    toggle(todoToToggle){
        dispatch(actions.todos.completeTodo(todoToToggle.id));
    }
    toggleAll(){
        dispatch(actions.todos.completeAll());
    }
    render() {
        var footer;
        var main;

        const { allTodos , filter } = this.props;
        console.log(filter.currentFilter);
        const filteredTodos = allTodos.filter(filter.filterFunction);

        const completedCount = allTodos.reduce((count, todo) =>
                todo.completed ? count + 1 : count,
            0
        );

        return (
            <div>
                <header className="header">
                    <input
                        className="new-todo"
                        type="text"
                        placeholder="What needs to be done?"
                        onKeyDown={this.handleNewTodoKeyDown.bind(this)}

                    />
                </header>
                <section className="main">
                    {this.renderToggleAll(completedCount)}
                    <ul className="todo-list">
                        {filteredTodos.map(todo=>
                            <TodoItem 
                                key={todo.id} 
                                todo={todo}
                                editing={this.state.editing === todo.id}
                                onDelete={this.deleteTodo.bind(this,todo)}
                                onToggle={this.toggle.bind(this,todo)}
                                onSaveEdit={this.edit.bind(this,todo)}
                                onEdit={this.setEditing.bind(this,todo)}
                                onCancel={this.onCancelEditing.bind(this)}
                            />
                        )}
                    </ul>
                </section>
                {this.renderFooter(completedCount)}
            </div>
        );
    }
}
MainSection.propTypes={
//    todos:PropTypes.array.isRequired,
//    actions:PropTypes.object.isRequired
};

function mapState(state, params) {
    return {
        allTodos: state.todos.allTodos,
        filter: state.todos.filter
    }
}
export default connect(mapState, MainSection);

