'use strict';
import React, {Component,PropTypes} from 'react';
const {connect, actions , dispatch} = require('tredux');

import TodoItem from './TodoItem.jsx';
import TodoFilter from './TodoFilter.jsx';

const SHOW_ALL = 'show_all',
    SHOW_COMPLETED = 'show_completed',
    SHOW_ACTIVE = 'show_active';

var ENTER_KEY = 13;

class MainSection extends React.Component {
    constructor(props){
        super(props);
    }
    addTodo(text){
        dispatch(actions.todos.addTodo(text));
    }
    deleteTodo(todo){
        dispatch(actions.todos.deleteTodo(todo.id));
    }
   
    handleClickAll(){
        //dispatch(actions.todos.setVisibilityFilter()) &&
        dispatch(actions.todos.setVisibilityFilter(SHOW_ALL))
    }
    handleClickActive(){
      //  dispatch(actions.todos.setVisibilityFilter()) &&
        dispatch(actions.todos.setVisibilityFilter(SHOW_ACTIVE))
    }
    handleClickCompleted(){
       // dispatch(actions.todos.setVisibilityFilter()) &&
        dispatch(actions.todos.setVisibilityFilter(SHOW_COMPLETED))
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
   
    renderFooter(completedCount){
        const { allTodos,currentFilter } = this.props;
        const currentCount=this.setItemsLeft(completedCount);
        if (allTodos.length) {
            return (
                <TodoFilter
                    key={currentFilter}
                    completedCount={completedCount}
                    count={currentCount}
                    clearCompletedButton={this.handleClearCompleted.bind(this)}
                    nowShowing={currentFilter}
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
        const { allTodos,currentFilter } = this.props;

        const activeCount=allTodos.length-completedCount;
        let count;

        if(currentFilter===SHOW_ALL){
            count=allTodos.length;
        }
        else
        if(currentFilter===SHOW_ACTIVE){
            count=activeCount;
        }
        else{
            count=completedCount;
        }
        return count;
    }
   
    toggle(todoToToggle){
        dispatch(actions.todos.completeTodo(todoToToggle.id));
    }
    toggleAll(){
        dispatch(actions.todos.completeAll());
    }
    render() {
        const { allTodos , filterFunction} = this.props;

        const filteredTodos = allTodos.filter(filterFunction);

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
                                onDelete={this.deleteTodo.bind(this,todo)}
                                onToggle={this.toggle.bind(this,todo)}
                            />
                        )}
                    </ul>
                </section>
                {this.renderFooter(completedCount)}
            </div>
        );
    }
}

function mapState(state, params) {
    return {
        allTodos: state.todos.allTodos,
        filter: state.todos.filter,
        currentFilter: state.todos.filter.currentFilter,
        filterFunction:state.todos.filter.filterFunction
    }
}
export default connect(mapState, MainSection);

