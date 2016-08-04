'use strict';
import React, {Component,PropTypes} from 'react';
import {connect, actions, getState} from 'tredux';
import TodoItem from './TodoItem.jsx';
import TodoFilter from './TodoFilter.jsx';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters.jsx'

var ENTER_KEY = 13;


const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
};



class MainSection extends React.Component {
    constructor(props){
        super(props);
        this.state={
            filter: SHOW_ALL,
            editing: null
        };
    }
    edit(todo,text){
        const { store } = this.props;
        store.dispatch(this.props.actions.editTodo(todo.id,text));
    }
    handleClickAll(){
        this.setState({filter:SHOW_ALL})
    }
    handleClickActive(){
        this.setState({filter:SHOW_ACTIVE})
    }
    handleClickCompleted(){
        this.setState({filter:SHOW_COMPLETED})
    }
    handleNewTodoKeyDown(event){
        if(event.keyCode !== ENTER_KEY)
            return;
        event.preventDefault();

        var val=this.state.newTodo.trim();
        if(val){
            this.addTodo(val);
            //this.setState({newTodo:''});
        }
    }
    renderToggleAll(completedCount) {
        const { todos, actions } = this.props;
        if (todos.length > 0) {
            return (
                <input className="toggle-all"
                       type="checkbox"
                       checked={completedCount === todos.length}
                       onChange={actions.completeAll} />
            )
        }
    }


    handleNewTodoKeyDown(event){
        if(event.keyCode !== ENTER_KEY)
            return;
        event.preventDefault();

        var val=event.target.value.trim();
        if(val){
            actions.todos.addTodo(val);
            event.target.value='';
        }
    }

    handleClearCompleted() {
        this.props.actions.clearCompleted()
    }

    handleShow(filter) {
        this.setState({filter: filter })
    }

    renderToggleAll(completedCount) {
        const { todos, actions } = this.props;
        if (todos.length > 0) {
            return (
                <input className="toggle-all"
                       type="checkbox"
                       checked={completedCount === todos.length}
                       onChange={actions.completeAll} />
            )
        }
    }

    setItemsLeft(completedCount){
        const { todos } = this.props;
        const { filter } = this.state;
        const activeCount=todos.length-completedCount;
        let count;

        if(filter===SHOW_ALL){
            count=todos.length;
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
    renderFooter(completedCount) {
        const { todos } = this.props;
        const { filter } = this.state;
        let count;
        const currentCount=this.setItemsLeft(completedCount);
        if (todos.length) {
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
    setEditing(todo){
        this.setState({editing:todo.id});
    }
    deleteTodo(todo){
        this.props.actions.deleteTodo(todo.id)
    }
    onCancelEditing(){
        this.setState({editing:null})
    }
    toggle(todoToToggle){
        this.props.actions.completeTodo(todoToToggle.id);
    }
    render() {
        var footer;
        var main;

        const { store, todos, actions } = this.props;
        const { filter } = this.state;
        const filteredTodos = todos.filter(TODO_FILTERS[filter]);
        // this.props.store.dispatch(editTodo(0,blabla));
        console.log(todos);

        const completedCount = todos.reduce((count, todo) =>
                todo.completed ? count + 1 : count,
            0
        );
        //console.log(todos);

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
    todos:PropTypes.array.isRequired,
    actions:PropTypes.object.isRequired
};

function mapState(state, params) {
    return {
        todos: state.todos.todos,
        filter: state.todos.filter
    }
}
export default connect(mapState, MainSection);

