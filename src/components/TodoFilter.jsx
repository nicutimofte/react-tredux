'use strict';
import React from 'react';
import classNames from 'classnames/bind';
const SHOW_ALL = 'show_all',
    SHOW_COMPLETED = 'show_completed',
    SHOW_ACTIVE = 'show_active';

class TodoFilter extends React.Component{
    handleActive(){
        this.props.clickedActive && this.props.clickedActive();
    }
    handleAll() {
        this.props.clickedAll && this.props.clickedAll();
    }
    handleClearCompleted(){
        this.props.clearCompletedButton && this.props.clearCompletedButton()
    }
    handleCompleted() {
        this.props.clickedCompleted && this.props.clickedCompleted();
    }
    render(){
        let nowShowing=this.props.nowShowing;
        var clearButton=null;
        if(this.props.completedCount > 0){
            clearButton=(
                <button
                    className="clear-completed"
                    onClick={this.handleClearCompleted.bind(this)}>
                    Clear completed
                </button>
            );
        }
        return(
            <footer className="footer">
                <strong className="todo-count" >{this.props.count} left</strong>
                <ul className="filters" >
                    <li  >
                        <a
                            onClick={this.handleAll.bind(this)}
                            className={classNames({selected: nowShowing === SHOW_ALL})}
                            href="#">

                            All
                        </a>
                    </li>
                    {"      "}
                    <li  >
                        <a onClick={this.handleActive.bind(this)}
                           className={classNames({selected: nowShowing === SHOW_ACTIVE})}
                           href="#">
                            Active

                        </a>
                    </li >
                    {"      "}
                    <li >
                        <a onClick={this.handleCompleted.bind(this)}
                           className={classNames({selected: nowShowing === SHOW_COMPLETED})}
                           href="#">
                           Completed

                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>

        );
    }
}

export default TodoFilter;